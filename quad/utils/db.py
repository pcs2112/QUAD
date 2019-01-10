from quad.db.db import execute_sp
from quad.db.exceptions import SPException
from quad.db.sp_in_args import sp_in_args as required_sp_in_args


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

    # Merge the in args
    if sp_name in required_sp_in_args:
        in_args = {**required_sp_in_args[sp_name], **in_args}

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
    in_args = {**required_sp_in_args['MWH.UMA_WAREHOUSE_ADMIN_CONSOLE'], **{
        'message': 'GET_ERROR_TEXT',
        'VARCHAR_01': error_id
    }}

    result = execute_sp(
        'MWH.UMA_WAREHOUSE_ADMIN_CONSOLE',
        in_args
    )

    return result[0][0]
