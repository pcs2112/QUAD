from quad.utils.db import execute_quad_sp


def create(sp_name, sp_message, in_args):
    """
    Creates a controlling account.
    :param str sp_name: Stored Procedure name
    :param str sp_message: Stored Procedure message
    :param dict in_args: str
    :returns dict: The created controlling account
    """
    return execute_quad_sp(
        sp_name,
        sp_message,
        {
            'IN_PCtrlAcct_ID': in_args['p_ctrl_acct_id'],
            'IN_Code': in_args['code'],
            'IN_Name': in_args['name'],
            'IN_Balance': in_args['balance'],
            'IN_rUnit_ID': in_args['ctrl_acct_units']
        }
    )
