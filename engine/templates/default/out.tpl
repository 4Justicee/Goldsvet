<div class="content">
						<div class="refill withdrawals">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
							<form id="outpayForm" action='/{$ge}?action=save' method='post'>
								<fieldset>
									<div class="block">
										<div class="title">
											<h2>{$lang['out_SUM_IN']}</h2>
										</div>
										<div class="form-control">
											<input type="text" name="sum" placeholder="0.00" value='{$real_balance}'/>
										</div>
									</div>
									<div class="block">
										<div class="title">
											<h2>{$lang['out_PS']}</h2>
										</div>
										<div class="form-control">
											<select name="ps">
						{foreach $ps as $ps_id=>$ps_title}
                          <option value="{$ps_id}">{$ps_title}</option>
                        {/foreach}
											</select>
										</div>
									</div>
									<div class="right">
										<input type="submit" value="{$lang['button_SEND']}" class="btn-green" />
									</div>
								</fieldset>
							</form>
						</div>
</div>