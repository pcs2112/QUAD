from quad.db.db import execute_sp
from quad.db.exceptions import SPException


LEGACY_QUAD_SP_IN_ARGS_LENGTH = 10


def fill_in_legacy_quad_sp_in_args(in_args):
    """
    Helper function to ensure the MWH.UMA_WAREHOUSE_ADMIN_CONSOLE SP
    is always called with the correct number of in arguments.

    :param in_args: SP in arguments
    :type in_args: dict
    :return: dict
    """
    new_in_args = in_args.copy()
    in_args_length = len(new_in_args.keys())
    if in_args_length < LEGACY_QUAD_SP_IN_ARGS_LENGTH:
        for x in range(in_args_length, LEGACY_QUAD_SP_IN_ARGS_LENGTH):
            in_arg_prefix = '0' if x < 10 else ''
            in_arg_name = f'VARCHAR_{in_arg_prefix}{x}'
            new_in_args[in_arg_name] = ''

    return new_in_args


def execute_legacy_quad_sp(*args):
    """
    Helper function to execute the MWH.UMA_WAREHOUSE_ADMIN_CONSOLE stored procedure.
    :return: Stored procedure result sets and out argument
    :rtype: list
    """
    sp_name = args[0]
    sp_message = args[1]

    in_args = {}

    for x in range(2, len(args)):
        in_arg_prefix = '0' if x < 10 else ''
        in_arg = f'VARCHAR_{in_arg_prefix}{x - 1}'
        in_args[in_arg] = str(args[x])
        
    return execute_quad_sp(sp_name, sp_message, fill_in_legacy_quad_sp_in_args(in_args))


def execute_quad_sp(sp_name, sp_message, sp_in_args):
    """
    Helper function to execute QUAD stored procedures.
    :param sp_name: Stored procedure name
    :type sp_name: str
    :param sp_message: Stored procedure message
    :type sp_message: str
    :param sp_in_args: Stored procedure in arguments
    :type sp_in_args: dict
    :return: Stored procedure result sets and out argument
    :rtype: list
    """
    out_arg = 'TryCatchError_ID'

    in_args = {
      'message': sp_message
    }

    for sp_in_arg in sp_in_args:
        in_args[sp_in_arg] = str(sp_in_args[sp_in_arg])

    result = execute_sp(sp_name, in_args, out_arg)
    result_count = len(result)
 
    status_code = result[result_count - 1][0][0]

    if status_code > 1:
        raise SPException(f'Stored Procedure call to SP "{sp_name}" failed.', status_code)

    if result_count == 1:
        return []

    return result[0]


def fetch_error(error_id):
    """
    Returns the error record.
    :param error_id: Error record ID
    :type error_id: int
    """
    result = execute_sp(
        'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE',
        fill_in_legacy_quad_sp_in_args({
            'message': 'GET_ERROR_TEXT',
            'VARCHAR_01': error_id
        })
    )
    
    return result[0][0]
