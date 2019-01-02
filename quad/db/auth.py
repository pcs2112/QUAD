from passlib.hash import pbkdf2_sha256 as sha256
from .exceptions import DBException
from quad.utils.db import execute_legacy_quad_sp


def fetch_user_by_id(id_):
    """
    Returns the user information.
    :param id_: User ID
    :type id_: int
    """
    return execute_legacy_quad_sp(
      'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE_REPORTS',
      'LIST_ADMIN_CONSOLE_USER_BY_ID',
      id_
    )[0]


def fetch_user_by_email(email):
    """
    Returns the user information.
    :param email: User email
    :type email: str
    """
    return execute_legacy_quad_sp(
      'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE_REPORTS',
      'LIST_ADMIN_CONSOLE_USER_BY_EMAIL',
      email
    )[0]


def login_user(email, password):
    """
    Returns True if the login credentials are valid.
    :param email: User email
    :type email: str
    :param password: Raw user password
    :type password: str
    """
    user_result = fetch_user_by_email(email)
    if user_result is None:
        raise DBException(f'"{email}" is an invalid account.', -1)

    if verify_password_hash(password, user_result['employee_password']) is False:
        raise DBException(f'"{email}" is an invalid account.', -2)

    execute_legacy_quad_sp(
      'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE',
      'LOGIN',
      email,
      user_result['employee_password']
    )

    return user_result['id']


def reset_user_password(email, existing_password, new_password):
    """
    Resets a user's password.
    :param email: User email
    :type email: str
    :param existing_password: Raw existing user password
    :type existing_password: str
    :param new_password: Raw new user password
    :type new_password: str
    """
    user_result = fetch_user_by_email(email)
    if user_result is None:
        raise DBException(f'"{email}" is an invalid account.', -1)

    if verify_password_hash(existing_password, user_result['employee_password']) is False:
        raise DBException('The password is invalid.', -2)

    execute_legacy_quad_sp(
      'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE',
      'PASSWORD RESET',
      email,
      user_result['employee_password'],
      generate_password_hash(new_password)
    )

    return user_result['id']


def forgot_password(data, scenario):
    user_result = fetch_user_by_email(data['email'])
    if user_result is None:
        raise DBException(f'"{data["email"]}" is an invalid account.', -1)

    if scenario == 1:
        return '123456'

    if scenario == 2:
        if data['verification_code'] != '123456':
            raise DBException(f'"{data["verification_code"]}" is an invalid verification code.', -2)

        return ''

    if scenario == 3:
        execute_legacy_quad_sp(
          'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE',
          'PASSWORD RESET',
          user_result['employee_email'],
          user_result['employee_password'],
          generate_password_hash(data['new_password'])
        )

        return user_result['id']


def generate_password_hash(raw_password):
    """
    Encrypts a raw password using the sha256 algorithm.
    :param raw_password: Raw password text
    :type raw_password: str
    """
    return sha256.hash(raw_password)


def verify_password_hash(raw_password, hashed_password):
    """
    Returns true if the specified raw password matches the specified hashed password.
    :param raw_password: Raw password text
    :type raw_password: str
    :param hashed_password: Hashed password text
    :type hashed_password: str
    """
    return sha256.verify(raw_password, hashed_password)
