<?php
/* Smarty version 3.1.31, created on 2020-01-14 16:57:36
  from "/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/history.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5e1dd6e02a9cb0_95558230',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'f7df1a6c713ce2b5b888a63121e3fe308be66a61' => 
    array (
      0 => '/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/history.tpl',
      1 => 1498228642,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5e1dd6e02a9cb0_95558230 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div class="content">
						<div class="refill statistics">
							<div class="heading">
								<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
								<div class="texts">
									<p><?php echo $_smarty_tpl->tpl_vars['sub_title']->value;?>
</p>
								</div>
							</div>
							<div class="statistics-area">
								<div class="tabset" id="tabset">
									<ul>
										<li><a href="#tab01" <?php if ($_smarty_tpl->tpl_vars['tab']->value == '#tab01') {?> class="active" <?php }?>><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_WITHDRAWL'];?>
</a></li>
										<li><a href="#tab02" <?php if ($_smarty_tpl->tpl_vars['tab']->value == '#tab02') {?> class="active" <?php }?>><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_HISTORY_PAY'];?>
</a></li>
										<li><a href="#tab03" <?php if ($_smarty_tpl->tpl_vars['tab']->value == '#tab03') {?> class="active" <?php }?>><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_HISTORY_LOGIN'];?>
 </a></li>
										<li><a href="#tab04" <?php if ($_smarty_tpl->tpl_vars['tab']->value == '#tab04') {?> class="active" <?php }?>><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_GAME_LOG'];?>
</a></li>
									</ul>
								</div>
								<div id="tab01">
									<div class="table">
										<table>
											<colgroup>
												<col style="width: 92px;" />
												<col style="width: 159px;" />
												<col style="width: 160px;" />
												<col style="width: 160px;" />
												<col style="width: 150px;" />
												<col />
											</colgroup>
											<tr>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_date'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_order_amout'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_payout'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_inv'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_PS'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_status'];?>
</th>
											</tr>
<?php if (isset($_smarty_tpl->tpl_vars['output']->value)) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['output']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
<tr>
      <td><?php echo date("d.m.Y",$_smarty_tpl->tpl_vars['a']->value['date']);?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['sum'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['sum_out'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['inv_code'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_ps'][$_smarty_tpl->tpl_vars['a']->value['ps']];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_statuses'][$_smarty_tpl->tpl_vars['a']->value['status']];?>
</td>
</tr>
<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

	
<?php } else { ?>

<tr><td colspan="6"><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_no_requests'];?>
</td></tr> 
 		
<?php }?>
										</table>
									</div>

<?php if (isset($_smarty_tpl->tpl_vars['output_nav']->value) && $_smarty_tpl->tpl_vars['output_nav']->value[1] > 1) {?>
              <nav class="paging">
								<?php if ($_smarty_tpl->tpl_vars['output_nav']->value[0] > 1) {?><a href="" class="btn-prev" title="                    " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0]-1;?>
","","/");'>  </a><?php }?>
								<ul>
									<?php if ($_smarty_tpl->tpl_vars['output_nav']->value[0] > 2) {?><li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['output_nav']->value[0] > 3) {?><li>..</li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['output_nav']->value[0] > 1) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0]-1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0]-1;?>
</a></li> <?php }?>
									<li class="active"><a href="" onclick='return false;'><?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0];?>
</a></li>
									<?php if (($_smarty_tpl->tpl_vars['output_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['output_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0]+1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0]+1;?>
</a></li> <?php }?>  
									<?php if (($_smarty_tpl->tpl_vars['output_nav']->value[0]+3 <= $_smarty_tpl->tpl_vars['output_nav']->value[1])) {?><li>..</li><?php }?>
                  <?php if (($_smarty_tpl->tpl_vars['output_nav']->value[0]+2 <= $_smarty_tpl->tpl_vars['output_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['output_nav']->value[1];?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['output_nav']->value[1];?>
</a></li><?php }?>
								</ul>
								<?php if (($_smarty_tpl->tpl_vars['output_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['output_nav']->value[1])) {?><a href="" class="btn-prev" title="                  " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['output_nav']->value[0]+1;?>
","","/");'>  </a><?php }?>
							</nav>
<?php }?>
                  
								</div>
								<div id="tab02">
									<div class="table">
										<table>
											<colgroup>
												<col style="width: 250px;" />
												<col style="width: 160px;" />
												<col style="width: 160px;" />
												<col style="width: 150px;" />
												<col />
											</colgroup>
											<tr>
						<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_date'];?>
</th>
                        <th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_inv'];?>
</th>
	                    <th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_order_amout'];?>
</th>
                        <th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_PS'];?>
</th>
											</tr>
<?php if (isset($_smarty_tpl->tpl_vars['enter']->value)) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['enter']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
<tr>
      <td><?php echo date("d.m.Y",$_smarty_tpl->tpl_vars['a']->value['date']);?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['inv_code'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['sum'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['paysys'];?>
</td>
</tr>
<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

	
<?php } else { ?>

<tr><td colspan="4"><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_no_enter'];?>
</td></tr> 
 		
<?php }?>

										</table>
									</div>

<?php if (isset($_smarty_tpl->tpl_vars['enter_nav']->value[1]) && $_smarty_tpl->tpl_vars['enter_nav']->value[1] > 1) {?>
              <nav class="paging">
								<?php if ($_smarty_tpl->tpl_vars['enter_nav']->value[0] > 1) {?><a href="" class="btn-prev" title="                    " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0]-1;?>
","","/");'>  </a><?php }?>
								<ul>
									<?php if ($_smarty_tpl->tpl_vars['enter_nav']->value[0] > 2) {?><li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['enter_nav']->value[0] > 3) {?><li>..</li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['enter_nav']->value[0] > 1) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0]-1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0]-1;?>
</a></li> <?php }?>
									<li class="active"><a href="" onclick='return false;'><?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0];?>
</a></li>
									<?php if (($_smarty_tpl->tpl_vars['enter_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['enter_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0]+1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0]+1;?>
</a></li> <?php }?>  
									<?php if (($_smarty_tpl->tpl_vars['enter_nav']->value[0]+3 <= $_smarty_tpl->tpl_vars['enter_nav']->value[1])) {?><li>..</li><?php }?>
                  <?php if (($_smarty_tpl->tpl_vars['enter_nav']->value[0]+2 <= $_smarty_tpl->tpl_vars['enter_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[1];?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[1];?>
</a></li><?php }?>
								</ul>
								<?php if (($_smarty_tpl->tpl_vars['enter_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['enter_nav']->value[1])) {?><a href="" class="btn-prev" title="                  " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['enter_nav']->value[0]+1;?>
","","/");'>  </a><?php }?>
							</nav>
<?php }?>
                  
								</div>
								<div id="tab03">
									<div class="table">
										<table>
											<colgroup>
												<col style="width: 250px;" />
												<col style="width: 470px;" />
												<col />
											</colgroup>
											<tr>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_date'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_IP'];?>
</th>
											</tr>
<?php if (isset($_smarty_tpl->tpl_vars['logip']->value)) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['logip']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
<tr>
      <td><?php echo date("d.m.Y",$_smarty_tpl->tpl_vars['a']->value['date']);?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['ip'];?>
</td>
</tr>
<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>

	
<?php } else { ?>

<tr><td colspan="2"><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_no_login'];?>
</td></tr> 
 		
<?php }?>

										</table>
									</div>

<?php if (isset($_smarty_tpl->tpl_vars['logip_nav']->value) && $_smarty_tpl->tpl_vars['logip_nav']->value[1] > 1) {?>
              <nav class="paging">
								<?php if ($_smarty_tpl->tpl_vars['logip_nav']->value[0] > 1) {?><a href="" class="btn-prev" title="                    " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0]-1;?>
","","/");'>  </a><?php }?>
								<ul>
									<?php if ($_smarty_tpl->tpl_vars['logip_nav']->value[0] > 2) {?><li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['logip_nav']->value[0] > 3) {?><li>..</li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['logip_nav']->value[0] > 1) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0]-1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0]-1;?>
</a></li> <?php }?>
									<li class="active"><a href="" onclick='return false;'><?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0];?>
</a></li>
									<?php if (($_smarty_tpl->tpl_vars['logip_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['logip_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0]+1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0]+1;?>
</a></li> <?php }?>  
									<?php if (($_smarty_tpl->tpl_vars['logip_nav']->value[0]+3 <= $_smarty_tpl->tpl_vars['logip_nav']->value[1])) {?><li>..</li><?php }?>
                  <?php if (($_smarty_tpl->tpl_vars['logip_nav']->value[0]+2 <= $_smarty_tpl->tpl_vars['logip_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[1];?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[1];?>
</a></li><?php }?>
								</ul>
								<?php if (($_smarty_tpl->tpl_vars['logip_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['logip_nav']->value[1])) {?><a href="" class="btn-prev" title="                  " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['logip_nav']->value[0]+1;?>
","","/");'>  </a><?php }?>
							</nav>
<?php }?>

								</div>
								<div id="tab04">
									<div class="table">
										<table>
											<colgroup>
												<col style="width: 250px;" />
												<col style="width: 160px;" />
												<col style="width: 160px;" />
												<col style="width: 150px;" />
												<col />
											</colgroup>
											<tr>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_date'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_game'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_bet'];?>
</th>
												<th><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_win'];?>
</th>
											</tr>
<?php if (isset($_smarty_tpl->tpl_vars['stat_game']->value)) {
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['stat_game']->value, 'a');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['a']->value) {
?>
<tr>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['date_time'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['game'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['stav'];?>
</td>
      <td><?php echo $_smarty_tpl->tpl_vars['a']->value['win'];?>
</td>
</tr>
<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
?>


<?php } else { ?>

<tr><td colspan="4" ><?php echo $_smarty_tpl->tpl_vars['lang']->value['history_no_game'];?>
</td></tr> 
 		
<?php }?>
										</table>
									</div>

<?php if (isset($_smarty_tpl->tpl_vars['stat_nav']->value) && $_smarty_tpl->tpl_vars['stat_nav']->value[1] > 1) {?>
              <nav class="paging">
								<?php if ($_smarty_tpl->tpl_vars['stat_nav']->value[0] > 1) {?><a href="" class="btn-prev" title="                    " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0]-1;?>
","","/");'>  </a><?php }?>
								<ul>
									<?php if ($_smarty_tpl->tpl_vars['stat_nav']->value[0] > 2) {?><li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['stat_nav']->value[0] > 3) {?><li>..</li><?php }?>
                  <?php if ($_smarty_tpl->tpl_vars['stat_nav']->value[0] > 1) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0]-1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0]-1;?>
</a></li> <?php }?>
									<li class="active"><a href="" onclick='return false;'><?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0];?>
</a></li>
									<?php if (($_smarty_tpl->tpl_vars['stat_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['stat_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0]+1;?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0]+1;?>
</a></li> <?php }?>  
									<?php if (($_smarty_tpl->tpl_vars['stat_nav']->value[0]+3 <= $_smarty_tpl->tpl_vars['stat_nav']->value[1])) {?><li>..</li><?php }?>
                  <?php if (($_smarty_tpl->tpl_vars['stat_nav']->value[0]+2 <= $_smarty_tpl->tpl_vars['stat_nav']->value[1])) {?><li><a href="" onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[1];?>
","","/");'><?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[1];?>
</a></li><?php }?>
								</ul>
								<?php if (($_smarty_tpl->tpl_vars['stat_nav']->value[0]+1 <= $_smarty_tpl->tpl_vars['stat_nav']->value[1])) {?><a href="" class="btn-prev" title="                  " onclick='setCookie("curpagenum", "<?php echo $_smarty_tpl->tpl_vars['stat_nav']->value[0]+1;?>
","","/");'>  </a><?php }?>
							</nav>
<?php }?>

								</div>
							</div>
						</div>
					</div>
          
          
<?php echo '<script'; ?>
>
  $("#tabset a").on('click', function()
    {
    setCookie('tab', $(this).attr('href'));
    }
  );
<?php echo '</script'; ?>
>          <?php }
}
