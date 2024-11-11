<div class="content">
<div class="refill profile">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
							<ul class="profile-items">
								<li>
									<h2>{$lang['profile_AVATAR']}</h2>
									<div class="holder">
										<div class="cell"><img src="{$theme_url}/images/avatar.png" width="160" height="160" alt=""/></div>
									</div>
								</li>
								<li>
									<h2>{$lang['profile_LOGIN']}</h2>
									<div class="holder">
										<div class="cell">
											{$login}
										</div>
									</div>
								</li>
								<li>
									<h2>{$lang['profile_ID']}</h2>
									<div class="holder">
										<div class="cell">
											{$user_info['id']}
										</div>
									</div>
								</li>
								<li>
									<h2>{$lang['profile_E-MAIL']}</h2>
									<div class="holder">
										<div class="cell">
											{$user_info['email']}
										</div>
									</div>
								</li>
							</ul>
							<form action="/{$ge}?action=save" method="post">
								<fieldset>
									<div class="block">
										<div class="title">
											<h2>{$lang['profile_CHANGE_PASS']}</h2>
										</div>
										<div class="form-control">
											<input type="password" name="pass_1" placeholder="{$lang['profile_new_pass']}" style="width: 280px;" />
											<input type="password" name="pass_2" placeholder="{$lang['profile_new_pass2']}" style="width: 280px;" />
										</div>
									</div>
									<div class="block">
										<div class="title">
											<h2>{$lang['profile_YOUR_E-MAIL']}</h2>
										</div>
										<div class="form-control">
                      {if $config['activate_mail']}
											<input type="email" name="email" placeholder="{$lang['profile_email_input']}" style="width: 280px;" value="{$user_info['email']}" {if $user_info['mail_active_status']>0} disabled {/if}/>
											{if $user_info['mail_active_status']<2 } {if $user_info['mail_active_status']>0 }
                        <input onkeyup="check('mail',this);" type="text" name="mail_code" placeholder="{$lang['profile_code_input']}" style="width: 280px;" maxlength=5 />
                      {else}
                        <a href="" class="btn-blue" style="width: 280px;" id="activate" onclick="return activate('mail',this);">{$lang['button_CONFIRM']}</a>
                        <input onkeyup="check('mail',this);" type="text" name="mail_code" placeholder="{$lang['profile_code_input']}" style="width: 280px;display: none;" maxlength=5 />
                      {/if}{/if}
                      {else}
                      <input type="email" name="email" placeholder="{$lang['profile_email_input']}" style="width: 280px;" value="{$user_info['email']}" />
                      {/if}
                      
										</div>
									</div>
									
									<div class="block">
										<div class="title">
											<h2>{$lang['profile_WMR']}</h2>
										</div>
										<div class="form-control">
											<input type="tel" name="wmr" placeholder="{$lang['profile_wmr_input']}" style="width: 280px;" value='{$user_info['wmr']}' {if  $user_info['wmr']} disabled {/if} />
										</div>
									</div>							
									
									<div class="block">
										<div class="title">
											<h2>{$lang['profile_PHONE_QIWI']}</h2>
										</div>
									<div class="form-control" style="position: relative">
										
                      <div id="flag" class="activeCountry regionRU"></div>
                      <input id="userphone" type="tel" placeholder="{$lang['profile_phone_input']}" style="width: 280px;" name='qiwi' value='{if $user_info['qiwi']} {$user_info['qiwi']} {else}+7{/if}' />
                      <ul style="display:none;" class="countriesList">
                      </ul>
				                	
										</div>
									</div>
									
                                    <div class="block">
										<div class="title">
											<h2>{$lang['profile_use_wager']}</h2>
										</div>
										<div class="form-control">
											<input type="checkbox" name="use_wager" value="1" style=" left:0;visibility: visible;position: static;" {if  $user_info['use_wager']} checked=checked {/if} />
										</div>
									</div>
									
									<div class="right">
										<input type="submit" value="{$lang['button_SAVE']}" class="btn-green" style="width: 220px;" />
									</div>

								</fieldset>
							</form>
</div>
</div>

<link type="text/css" rel="stylesheet" href="{$theme_url}/css/flags.css" />

<script>
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
                    alert("Активация прошла успешно");
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
        //проверим мыло
        if(!check_mail(val))
          {
          input_el.css('box-shadow', '0 0 3px rgba(255, 0, 0, 0.4) inset');
          return false;
          }  
        }
      else if(type=='phone')
        {
        //проверим телефон
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
  
    
//здесь префиксы разрешенных для регистрации телефонов
a_phone_prefix={
                'RU':['+7','Россия'],
                'UA':['+38','Украина'],
				'US':['+1','США']
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

</script>