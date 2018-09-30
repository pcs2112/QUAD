from flask import jsonify, request
from quad.exceptions import InvalidUsage
from quad.db.exceptions import SPException


def get_admin_console_sp_in_args_from_dict(required_args, args):
    """
    Returns the admin_console_sp in args from data in a dictionary.
    :param required_args:
    :type required_args: list
    :param args:
    :type args: dict
    :return: List of in arguments for the admin_console_sp function
    """
    out_args = []

    if len(required_args) > 0:
        for required_arg in required_args:
            if required_arg not in args:
                raise SPException(
                  f' Missing required argument "{required_arg}".',
                  -1
                )

            out_args.append(args[required_arg])

    return out_args


def execute_admin_console_sp_from_view(module, path, path_sp_args_map):
    if path not in path_sp_args_map:
        raise InvalidUsage.not_found()

    path_data = path_sp_args_map[path]

    try:
        func = getattr(module, path_data['sp_func'])

        #  Get the SP in arguments from the request
        in_args = []
        if 'sp_in_args' in path_data:
            in_args = get_admin_console_sp_in_args_from_dict(
              path_data['sp_in_args'],
              request.args
            )

        return jsonify(func(
          path_data['sp_name'],
          path_data['sp_message'],
          *in_args
        ))
    except SPException as e:
        raise InvalidUsage.etl_error(message=e.message)
