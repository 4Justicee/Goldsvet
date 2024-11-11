{assign var=p value=0}
            {foreach $payways as $k=>$payway}
            {if $p++%3==0}
              <div class="items-row">  
            {/if}
              <div class="item payitemsys">
              <div class="item-wrap">
                <form method="POST" action="/enter?system=trioApi&amp;action=send" class="payment-form">
                <input type="hidden" name="bonus_id" class="deposit-bonus-id">  
                <label>
                  <input type="radio" name="psystem" value="{$k}" style="display:none">
                  <div class="item-img">
                      {*<img src="https://commercepay.org/uploads/PaymentMethod/dec78ffda2345dc7f90d0e7103b76b6d.png" alt="" width="90%">*}
                      <svg style="width: 185px; height: 60px;">
                         <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{$theme_url}/img/svgsprite.svg#{$k}"></use>
                      </svg>
                  </div>
                  <div class="item-description">
                      <p>{$lang['limits']}</p>
                      <p>{$config['enter_from']} - {$config['enter_to']} {$lang['currency']}</p>
                  </div>
                </label>
                <div class="item-form">
                                  {if $k=='qiwi_rub'}
                                  <div class="contact-form-row cfix item-tel">
                                        <div class="contact-form-item">
                                            <div class="contact-form-item-input form_row ">
                                                <p>Номер телефона</p>
                                                <div class="form_input">
    						                                                    							<input type="tel" name="account" required="" maxlength="14" placeholder="00000000000">
                            						                                                
						                      </div>
                                            </div>
                                        </div>
                                    </div>
                                   {/if} 
                                  <div class="contact-form-row cfix item-radio">
                                        <div class="contact-form-item">
                                            <div class="contact-form-item-input form_row ">
                                                <p>Сумма</p>
                                                <div class="form_input">
                                                    <label>
                                                        <input id="p_0_800" type="radio" name="money" value="500">
                                                        <span class="circle-checkbox"></span>
                                                        <b>500</b></label>
                                                    <label>
                                                        <input id="p_0_800" type="radio" name="money" value="1000">
                                                        <span class="circle-checkbox"></span>
                                                        <b>1000</b></label>
                                                    <label>
                                                        <input id="p_0_800" type="radio" name="money" value="5000">
                                                        <span class="circle-checkbox"></span>
                                                        <b>5000</b></label>
                                                    <label>
                                                        <input type="radio" name="money" value="500" checked="" id="custom_value_Array">
                                                        <span class="circle-checkbox"></span>
                                                        <span class="input-value">
                                                            <input type="text" name="amount" value="500">
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="contact-form-item">
                                            <button type="submit" class="contact-submit">
                                                <span>Пополнить</span>
                                            </button>
                                        </div>
				                    </div>     
                           			<div class="contact-form-row cfix pay-tooltip__note"><i class="fa fa-exclamation-triangle"></i>
                                        <center><span class="error__info1" style="color:red"></span></center>
                                    </div>   
                                </div>
                    </form>                                
               </div>
             </div>   
             {if $p%3==0 || $p==$payways|count}
              
              </div>
            
             {/if}                       
                  
            {/foreach}                    
                