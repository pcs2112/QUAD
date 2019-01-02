from flask import Blueprint
from quad.utils.nocache import nocache
from quad.utils.views import execute_sp_func_from_view
from .api_config import path_sp_args_map


blueprint = Blueprint('controlling_accounts', __name__, url_prefix='/api/controlling_accounts')


@blueprint.route('/', defaults={'path': 'all'})
@blueprint.route('/<path:path>', methods=('GET',))
@nocache
def get_sp_data(path):
    return execute_sp_func_from_view(path, path_sp_args_map)
