<?php
/**
 * MyBB 1.4
 * Copyright � 2008 MyBB Group, All Rights Reserved
 *
 * Website: http://www.mybboard.net
 * License: http://www.mybboard.net/about/license
 *
 * $Id: module_meta.php 4304 2009-01-02 01:11:56Z chris $
 */

// Disallow direct access to this file for security reasons
if(!defined("IN_MYBB"))
{
	die("Direct initialization of this file is not allowed.<br /><br />Please make sure IN_MYBB is defined.");
}

function tools_meta()
{
	global $page, $lang, $plugins;

	$sub_menu = array();
	$sub_menu['10'] = array("id" => "system_health", "title" => $lang->system_health, "link" => "index.php?module=tools/system_health");
	$sub_menu['20'] = array("id" => "cache", "title" => $lang->cache_manager, "link" => "index.php?module=tools/cache");
	$sub_menu['30'] = array("id" => "tasks", "title" => $lang->task_manager, "link" => "index.php?module=tools/tasks");
	$sub_menu['40'] = array("id" => "recount_rebuild", "title" => $lang->recount_and_rebuild, "link" => "index.php?module=tools/recount_rebuild");
	$sub_menu['50'] = array("id" => "php_info", "title" => $lang->view_php_info, "link" => "index.php?module=tools/php_info");
	$sub_menu['60'] = array("id" => "backupdb", "title" => $lang->database_backups, "link" => "index.php?module=tools/backupdb");
	$sub_menu['70'] = array("id" => "optimizedb", "title" => $lang->optimize_database, "link" => "index.php?module=tools/optimizedb");
	
	$plugins->run_hooks_by_ref("admin_tools_menu", $sub_menu);
	
	$page->add_menu_item($lang->tools_and_maintenance, "tools", "index.php?module=tools", 50, $sub_menu);
	
	return true;
}

function tools_action_handler($action)
{
	global $page, $lang, $plugins;
	
	$page->active_module = "tools";
	
	$actions = array(
		'php_info' => array('active' => 'php_info', 'file' => 'php_info.php'),
		'tasks' => array('active' => 'tasks', 'file' => 'tasks.php'),
		'backupdb' => array('active' => 'backupdb', 'file' => 'backupdb.php'),
		'optimizedb' => array('active' => 'optimizedb', 'file' => 'optimizedb.php'),
		'cache' => array('active' => 'cache', 'file' => 'cache.php'),
		'recount_rebuild' => array('active' => 'recount_rebuild', 'file' => 'recount_rebuild.php'),
		'maillogs' => array('active' => 'maillogs', 'file' => 'maillogs.php'),
		'mailerrors' => array('active' => 'mailerrors', 'file' => 'mailerrors.php'),
		'adminlog' => array('active' => 'adminlog', 'file' => 'adminlog.php'),
		'modlog' => array('active' => 'modlog', 'file' => 'modlog.php'),
		'warninglog' => array('active' => 'warninglog', 'file' => 'warninglog.php'),
		'system_health' => array('active' => 'system_health', 'file' => 'system_health.php')
	);
	
	$plugins->run_hooks_by_ref("admin_tools_action_handler", $actions);

	$sub_menu = array();
	$sub_menu['10'] = array("id" => "adminlog", "title" => $lang->administrator_log, "link" => "index.php?module=tools/adminlog");
	$sub_menu['20'] = array("id" => "modlog", "title" => $lang->moderator_log, "link" => "index.php?module=tools/modlog");
	$sub_menu['30'] = array("id" => "maillogs", "title" => $lang->user_email_log, "link" => "index.php?module=tools/maillogs");
	$sub_menu['40'] = array("id" => "mailerrors", "title" => $lang->system_mail_log, "link" => "index.php?module=tools/mailerrors");
	$sub_menu['50'] = array("id" => "warninglog", "title" => $lang->user_warning_log, "link" => "index.php?module=tools/warninglog");
	
	$plugins->run_hooks_by_ref("admin_tools_menu_logs", $sub_menu);
	
	if(!isset($actions[$action]))
	{
		$page->active_action = "system_health";
	}
	
	$sidebar = new SidebarItem($lang->logs);
	$sidebar->add_menu_items($sub_menu, $actions[$action]['active']);
	
	$page->sidebar .= $sidebar->get_markup();
	
	if(isset($actions[$action]))
	{
		$page->active_action = $actions[$action]['active'];
		return $actions[$action]['file'];
	}
	else
	{
		return "system_health.php";
	}
}

function tools_admin_permissions()
{
	global $lang, $plugins;
	
	$admin_permissions = array(
		"system_health" => $lang->can_access_system_health,
		"cache" => $lang->can_manage_cache,
		"tasks" => $lang->can_manage_tasks,
		"backupdb" => $lang->can_manage_db_backup,
		"optimizedb" => $lang->can_optimize_db,
		"recount_rebuild" => $lang->can_recount_and_rebuild,
		"adminlog" => $lang->can_manage_admin_logs,
		"modlog" => $lang->can_manage_mod_logs,
		"maillogs" => $lang->can_manage_user_mail_log,
		"mailerrors" => $lang->can_manage_system_mail_log,
		"warninglog" => $lang->can_manage_user_warning_log,
		"php_info" => $lang->can_view_php_info
	);
	
	$plugins->run_hooks_by_ref("admin_tools_permissions", $admin_permissions);
	
	return array("name" => $lang->tools_and_maintenance, "permissions" => $admin_permissions, "disporder" => 50);
}
?>