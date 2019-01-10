path_sp_args_map = {
    'all': {
        'module_name': 'quad.utils.db',
        'module_func': 'execute_quad_sp',
        'sp_name': 'QUAD.MANAGE_CTRLACCT',
        'sp_message': 'DISPLAY ALL',
        'request_type': 'GET'
    },
    'create': {
        'module_name': 'quad.db.controlling_accounts',
        'module_func': 'create',
        'sp_name': 'QUAD.MANAGE_CTRLACCT',
        'sp_message': 'ADD',
        'sp_in_args': ['code', 'name', 'p_ctrl_acct_id', 'balance', 'ctrl_acct_units'],
        'request_type': 'POST'
    }
}
