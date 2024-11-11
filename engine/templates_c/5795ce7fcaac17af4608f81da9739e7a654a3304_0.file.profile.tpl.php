<?php
/* Smarty version 3.1.31, created on 2020-01-14 16:57:33
  from "/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/profile.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5e1dd6dd0f4c20_09872395',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5795ce7fcaac17af4608f81da9739e7a654a3304' => 
    array (
      0 => '/var/www/vhosts/slotcasinospro.com/httpdocs/engine/templates/default/profile.tpl',
      1 => 1498228642,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5e1dd6dd0f4c20_09872395 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div class="content">
<div class="refill profile">
							<div class="heading">
								<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
								<div class="texts">
									<p><?php echo $_smarty_tpl->tpl_vars['sub_title']->value;?>
</p>
								</div>
							</div>
							<ul class="profile-items">
								<li>
									<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_AVATAR'];?>
</h2>
									<div class="holder">
										<div class="cell"><img src="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/images/avatar.png" width="160" height="160" alt=""/></div>
									</div>
								</li>
								<li>
									<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_LOGIN'];?>
</h2>
									<div class="holder">
										<div class="cell">
											<?php echo $_smarty_tpl->tpl_vars['login']->value;?>

										</div>
									</div>
								</li>
								<li>
									<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_ID'];?>
</h2>
									<div class="holder">
										<div class="cell">
											<?php echo $_smarty_tpl->tpl_vars['user_info']->value['id'];?>

										</div>
									</div>
								</li>
								<li>
									<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_E-MAIL'];?>
</h2>
									<div class="holder">
										<div class="cell">
											<?php echo $_smarty_tpl->tpl_vars['user_info']->value['email'];?>

										</div>
									</div>
								</li>
							</ul>
							<form action="/<?php echo $_smarty_tpl->tpl_vars['ge']->value;?>
?action=save" method="post">
								<fieldset>
									<div class="block">
										<div class="title">
											<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_CHANGE_PASS'];?>
</h2>
										</div>
										<div class="form-control">
											<input type="password" name="pass_1" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_new_pass'];?>
" style="width: 280px;" />
											<input type="password" name="pass_2" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_new_pass2'];?>
" style="width: 280px;" />
										</div>
									</div>
									<div class="block">
										<div class="title">
											<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_YOUR_E-MAIL'];?>
</h2>
										</div>
										<div class="form-control">
                      <?php if ($_smarty_tpl->tpl_vars['config']->value['activate_mail']) {?>
											<input type="email" name="email" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_email_input'];?>
" style="width: 280px;" value="<?php echo $_smarty_tpl->tpl_vars['user_info']->value['email'];?>
" <?php if ($_smarty_tpl->tpl_vars['user_info']->value['mail_active_status'] > 0) {?> disabled <?php }?>/>
											<?php if ($_smarty_tpl->tpl_vars['user_info']->value['mail_active_status'] < 2) {?> <?php if ($_smarty_tpl->tpl_vars['user_info']->value['mail_active_status'] > 0) {?>
                        <input onkeyup="check('mail',this);" type="text" name="mail_code" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_code_input'];?>
" style="width: 280px;" maxlength=5 />
                      <?php } else { ?>
                        <a href="" class="btn-blue" style="width: 280px;" id="activate" onclick="return activate('mail',this);"><?php echo $_smarty_tpl->tpl_vars['lang']->value['button_CONFIRM'];?>
</a>
                        <input onkeyup="check('mail',this);" type="text" name="mail_code" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_code_input'];?>
" style="width: 280px;display: none;" maxlength=5 />
                      <?php }
}?>
                      <?php } else { ?>
                      <input type="email" name="email" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_email_input'];?>
" style="width: 280px;" value="<?php echo $_smarty_tpl->tpl_vars['user_info']->value['email'];?>
" />
                      <?php }?>
                      
										</div>
									</div>
									
									<div class="block">
										<div class="title">
											<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_WMR'];?>
</h2>
										</div>
										<div class="form-control">
											<input type="tel" name="wmr" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_wmr_input'];?>
" style="width: 280px;" value='<?php echo $_smarty_tpl->tpl_vars['user_info']->value['wmr'];?>
' <?php if ($_smarty_tpl->tpl_vars['user_info']->value['wmr']) {?> disabled <?php }?> />
										</div>
									</div>							
									
									<div class="block">
										<div class="title">
											<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_PHONE_QIWI'];?>
</h2>
										</div>
									<div class="form-control" style="position: relative">
										
                      <div id="flag" class="activeCountry regionRU"></div>
                      <input id="userphone" type="tel" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_phone_input'];?>
" style="width: 280px;" name='qiwi' value='<?php if ($_smarty_tpl->tpl_vars['user_info']->value['qiwi']) {?> <?php echo $_smarty_tpl->tpl_vars['user_info']->value['qiwi'];?>
 <?php } else { ?>+7<?php }?>' />
                      <ul style="display:none;" class="countriesList">
                      </ul>
				                	
										</div>
									</div>
									
                                    <div class="block">
										<div class="title">
											<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['profile_use_wager'];?>
</h2>
										</div>
										<div class="form-control">
											<input type="checkbox" name="use_wager" value="1" style=" left:0;visibility: visible;position: static;" <?php if ($_smarty_tpl->tpl_vars['user_info']->value['use_wager']) {?> checked=checked <?php }?> />
										</div>
									</div>
									
									<div class="right">
										<input type="submit" value="<?php echo $_smarty_tpl->tpl_vars['lang']->value['button_SAVE'];?>
" class="btn-green" style="width: 220px;" />
									</div>

								</fieldset>
							</form>
</div>
</div>

<link type="text/css" rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['theme_url']->value;?>
/css/flags.css" />

<?php echo '<script'; ?>
>
function activate(type,el)
  {
  code=el.value;
  if(el.value!=undefined)
    {
  if(code.length==32)
    {
    $.ajax({
				      url: "../engine/ajax/activate.php",
				      data: "type="+type+"&code="+code,
				      cache: false,
				      success: function(data){
                  activate_data=data.split('|');
                  if(activate_data[0]=='OK')
                    {
                    $(el).hide();
                    alert("                                              ");
                    }
                  else
                    alert(activate_data[1]);
				          }
			        });
    
    }
    }
  else 
    {
    var input_el=$(el).prevAll("input");        
    var val=input_el.val();
    if(!(val=='' || val=='+'))
      {
      if(type=='mail'){
        //                         
        if(!check_mail(val))
          {
          input_el.css('box-shadow', '0 0 3px rgba(255, 0, 0, 0.4) inset');
          return false;
          }  
        }
      else if(type=='phone')
        {
        //                               
        if(!check_phone(val))
          {
          input_el.css('box-shadow', '0 0 3px rgba(255, 0, 0, 0.4) inset');
          return false;
          }
        }  
      }
    else
      {
      input_el.css('box-shadow', '0 0 3px rgba(255, 0, 0, 0.4) inset');
      return false;
      }  
    $.ajax({
				      url: "../engine/ajax/activate.php",
				      data: "type="+type+"&val="+val,
              method: 'post',
				      cache: false,
				      success: function(data){
                  activate_data=data.split('|');
                  if(activate_data[0]=='OK')
                    {
                    $(el).hide();
                    $(el).prevAll("input").attr('disabled','true');
                    $(el).next().show();
                    }
                  else
                    alert(activate_data[1]);
				          }
			        });
    }
    return false;
  }
  
    
//                                                                                                   
a_phone_prefix={
                'RU':['+7','            '],
                'UA':['+38','              '],
				'US':['+1','      ']
                };


$(document).ready(function () 
    {
    $(".form-control input").on('focus',function()
        {
        $(this).css('box-shadow', '1px 1px 2px rgba(0, 1, 1, 0.15) inset');
        });
        
    $(".countriesList").html('');
    $.each(a_phone_prefix, function( k, av ) 
        {
        $(".countriesList").append('<li class="counrty'+k+'"><div class="itemFlag"></div><div class="item">'+k+'</div><div class="itemName">'+av[1]+'</div><div class="itemCode">'+av[0]+'</div><div class="clearBoth"></div></li>');
        
        });
        
    $(".countriesList li").on('click',function()
        {
        
                                          $("#userphone").val($(this).children(".itemCode").html());
                                          $("#flag").removeClass();
                                          $("#flag").addClass('activeCountry region'+$(this).children(".item").html());
                                          $(".countriesList").hide();
        });
    $("#flag").on('click',function()
        {
          if(!$("#userphone").attr('disabled'))
            $(".countriesList").toggle()
        });
          
    $(document).on("click", ".ui-button", function()
        {
        $(".countriesList").hide()
        });      
    
    $("#userphone").keyup(
      function()
        {
        phone=this.value;
        
        if(phone.indexOf('+')!==0)
          phone='+'+phone;
        else if(phone.length==1)
          phone='';
        
        phone_ok=false;
        
        $.each(a_phone_prefix, function( k, av ) 
          {
          v=av[0];
          if(phone.length>=v.length)
            phone_prefix=phone.substring(0,v.length);
          else
            {
            v=v.substring(0,phone.length);
            phone_prefix=phone;
            }
          if(phone_prefix==v)
            {
            phone_ok=true;
            flag=k;
            }  
        });
        if(phone_ok)
          {  
          this.value=phone;
          //alert(flag);
          $("#flag").removeClass();
          $("#flag").addClass('activeCountry region'+flag);
          }
        else
          this.value='';    
            
        });
});

<?php echo '</script'; ?>
><?php }
}
