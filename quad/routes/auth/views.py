from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity,
    get_jwt_claims
)
from quad.exceptions import InvalidUsage
from quad.db.exceptions import SPException, DBException
from quad.db.auth import fetch_user_by_email, login_user, forgot_password
from quad.utils.nocache import nocache
from quad.utils.db import fetch_error


blueprint = Blueprint('auth', __name__, url_prefix='/api/auth')


@blueprint.route('/user', methods=('GET',))
@nocache
@jwt_required
def get_current_user():
    claims = get_jwt_claims()
    result = fetch_user_by_email(claims['email'])
    if result is None:
        raise InvalidUsage.unauthorized_request()

    return jsonify(result)


@blueprint.route('/login', methods=('POST',))
@nocache
def post_login():
    body = request.get_json(silent=True)
    try:
        login_user(body['email'], body['password'])
    except DBException as e:
        if e.code == -1:
            raise InvalidUsage.form_validation_error({'email': 'Invalid account.'})
        else:
            raise InvalidUsage.form_validation_error({'password': 'Invalid password.'})
    except SPException as e:
        raise InvalidUsage.etl_error(e.message, fetch_error(e.error_id))

    access_token = create_access_token(identity=body['email'])
    refresh_token = create_refresh_token(identity=body['email'])
    return jsonify({
      'access_token': access_token,
      'refresh_token': refresh_token
    })


@blueprint.route('/refresh_token', methods=('GET',))
@nocache
@jwt_refresh_token_required
def get_refresh_token():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify({
      'access_token': access_token
    })


@blueprint.route('/forgot', methods=('POST',))
@nocache
def post_forgot():
    body = request.get_json(silent=True)
    try:
        return jsonify(forgot_password(body, body['scenario']))
    except DBException as e:
        if e.code == -2:
            raise InvalidUsage.form_validation_error({'verification_code': e.message})
        else:
            raise InvalidUsage.form_validation_error({'email': e.message})
