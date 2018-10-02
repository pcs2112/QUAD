import importlib
from flask import jsonify, request
from quad.exceptions import InvalidUsage
from quad.db.exceptions import SPException


def get_sp_func_in_args_from_dict(required_args, args):
    """
    Returns the in args for a helper SP function.
    :param required_args:
    :type required_args: list
    :param args:
    :type args: dict
    :return: Dict of in arguments for the execute_sp_func_from_view function
    """
    out_args = {}

    if len(required_args) > 0:
        for required_arg in required_args:
            if required_arg not in args:
                raise SPException(
                  f' Missing required argument "{required_arg}".',
                  -1
                )

            out_args[required_arg] = args[required_arg]

    return out_args


def execute_sp_func_from_view(path, path_sp_args_map):
    """
    Execute a quad SP function from a Flask view.
    :param path:
    :type path: list
    :param path_sp_args_map:
    :type path_sp_args_map: dict
    :return: Dict of in arguments for the execute_sp_func_from_view function
    """
    if path not in path_sp_args_map:
        raise InvalidUsage.not_found()

    path_data = path_sp_args_map[path]

    try:
        module = importlib.import_module(path_data['module_name'])
        func = getattr(module, path_data['module_func'])

        #  Get the SP in arguments from the request
        in_args = []
        if 'sp_in_args' in path_data:
            in_args = get_sp_func_in_args_from_dict(
              path_data['sp_in_args'],
              request.args
            )

        return jsonify(func(
          path_data['sp_name'],
          path_data['sp_message'],
          in_args
        ))
    except SPException as e:
        raise InvalidUsage.etl_error(message=e.message)
