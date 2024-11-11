<div class="content">
						<div class="refill statistics">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
							<div class="statistics-area">
								<div class="tabset" id="tabset">
									<ul>
										<li><a href="#tab01" {if $tab=='#tab01'} class="active" {/if}>{$lang['history_WITHDRAWL']}</a></li>
										<li><a href="#tab02" {if $tab=='#tab02'} class="active" {/if}>{$lang['history_HISTORY_PAY']}</a></li>
										<li><a href="#tab03" {if $tab=='#tab03'} class="active" {/if}>{$lang['history_HISTORY_LOGIN']} </a></li>
										<li><a href="#tab04" {if $tab=='#tab04'} class="active" {/if}>{$lang['history_GAME_LOG']}</a></li>
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
												<th>{$lang['history_date']}</th>
												<th>{$lang['history_order_amout']}</th>
												<th>{$lang['history_payout']}</th>
												<th>{$lang['history_inv']}</th>
												<th>{$lang['history_PS']}</th>
												<th>{$lang['history_status']}</th>
											</tr>
{if isset($output)}
{foreach $output as $a}
<tr>
      <td>{date("d.m.Y", $a['date'])}</td>
      <td>{$a['sum']}</td>
      <td>{$a['sum_out']}</td>
      <td>{$a['inv_code']}</td>
      <td>{$lang['history_ps'][$a['ps']]}</td>
      <td>{$lang['history_statuses'][$a['status']]}</td>
</tr>
{/foreach}
	
{else}

<tr><td colspan="6">{$lang['history_no_requests']}</td></tr> 
 		
{/if}
										</table>
									</div>
{*paginator*}
{if isset($output_nav) && $output_nav[1]>1}
              <nav class="paging">
								{if $output_nav[0]>1}<a href="" class="btn-prev" title="Предыдущая" onclick='setCookie("curpagenum", "{$output_nav[0]- 1}","","/");'>«</a>{/if}
								<ul>
									{if $output_nav[0]>2}<li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li>{/if}
                  {if $output_nav[0]>3}<li>..</li>{/if}
                  {if $output_nav[0]>1}<li><a href="" onclick='setCookie("curpagenum", "{$output_nav[0]- 1}","","/");'>{$output_nav[0]- 1}</a></li> {/if}
									<li class="active"><a href="" onclick='return false;'>{$output_nav[0]}</a></li>
									{if ($output_nav[0]+1 <=$output_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$output_nav[0]+1}","","/");'>{$output_nav[0]+ 1}</a></li> {/if}  
									{if ($output_nav[0]+3 <=$output_nav[1]) }<li>..</li>{/if}
                  {if ($output_nav[0]+2 <=$output_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$output_nav[1]}","","/");'>{$output_nav[1]}</a></li>{/if}
								</ul>
								{if ($output_nav[0]+1 <=$output_nav[1]) }<a href="" class="btn-prev" title="Следующая" onclick='setCookie("curpagenum", "{$output_nav[0]+1}","","/");'>»</a>{/if}
							</nav>
{/if}
                  
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
						<th>{$lang['history_date']}</th>
                        <th>{$lang['history_inv']}</th>
	                    <th>{$lang['history_order_amout']}</th>
                        <th>{$lang['history_PS']}</th>
											</tr>
{if isset($enter)}
{foreach $enter as $a}
<tr>
      <td>{date("d.m.Y", $a['date'])}</td>
      <td>{$a['inv_code']}</td>
      <td>{$a['sum']}</td>
      <td>{$a['paysys']}</td>
</tr>
{/foreach}
	
{else}

<tr><td colspan="4">{$lang['history_no_enter']}</td></tr> 
 		
{/if}

										</table>
									</div>
{*paginator*}
{if isset($enter_nav[1]) && $enter_nav[1]>1}
              <nav class="paging">
								{if $enter_nav[0]>1}<a href="" class="btn-prev" title="Предыдущая" onclick='setCookie("curpagenum", "{$enter_nav[0]- 1}","","/");'>«</a>{/if}
								<ul>
									{if $enter_nav[0]>2}<li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li>{/if}
                  {if $enter_nav[0]>3}<li>..</li>{/if}
                  {if $enter_nav[0]>1}<li><a href="" onclick='setCookie("curpagenum", "{$enter_nav[0]- 1}","","/");'>{$enter_nav[0]- 1}</a></li> {/if}
									<li class="active"><a href="" onclick='return false;'>{$enter_nav[0]}</a></li>
									{if ($enter_nav[0]+1 <=$enter_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$enter_nav[0]+1}","","/");'>{$enter_nav[0]+ 1}</a></li> {/if}  
									{if ($enter_nav[0]+3 <=$enter_nav[1]) }<li>..</li>{/if}
                  {if ($enter_nav[0]+2 <=$enter_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$enter_nav[1]}","","/");'>{$enter_nav[1]}</a></li>{/if}
								</ul>
								{if ($enter_nav[0]+1 <=$enter_nav[1]) }<a href="" class="btn-prev" title="Следующая" onclick='setCookie("curpagenum", "{$enter_nav[0]+1}","","/");'>»</a>{/if}
							</nav>
{/if}
                  
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
												<th>{$lang['history_date']}</th>
												<th>{$lang['history_IP']}</th>
											</tr>
{if isset($logip)}
{foreach $logip as $a}
<tr>
      <td>{date("d.m.Y", $a['date'])}</td>
      <td>{$a['ip']}</td>
</tr>
{/foreach}
	
{else}

<tr><td colspan="2">{$lang['history_no_login']}</td></tr> 
 		
{/if}

										</table>
									</div>
{*paginator*}
{if isset($logip_nav) && $logip_nav[1]>1}
              <nav class="paging">
								{if $logip_nav[0]>1}<a href="" class="btn-prev" title="Предыдущая" onclick='setCookie("curpagenum", "{$logip_nav[0]- 1}","","/");'>«</a>{/if}
								<ul>
									{if $logip_nav[0]>2}<li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li>{/if}
                  {if $logip_nav[0]>3}<li>..</li>{/if}
                  {if $logip_nav[0]>1}<li><a href="" onclick='setCookie("curpagenum", "{$logip_nav[0]- 1}","","/");'>{$logip_nav[0]- 1}</a></li> {/if}
									<li class="active"><a href="" onclick='return false;'>{$logip_nav[0]}</a></li>
									{if ($logip_nav[0]+1 <=$logip_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$logip_nav[0]+1}","","/");'>{$logip_nav[0]+ 1}</a></li> {/if}  
									{if ($logip_nav[0]+3 <=$logip_nav[1]) }<li>..</li>{/if}
                  {if ($logip_nav[0]+2 <=$logip_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$logip_nav[1]}","","/");'>{$logip_nav[1]}</a></li>{/if}
								</ul>
								{if ($logip_nav[0]+1 <=$logip_nav[1]) }<a href="" class="btn-prev" title="Следующая" onclick='setCookie("curpagenum", "{$logip_nav[0]+1}","","/");'>»</a>{/if}
							</nav>
{/if}

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
												<th>{$lang['history_date']}</th>
												<th>{$lang['history_game']}</th>
												<th>{$lang['history_bet']}</th>
												<th>{$lang['history_win']}</th>
											</tr>
{if isset($stat_game)}
{foreach $stat_game as $a}
<tr>
      <td>{$a['date_time']}</td>
      <td>{$a['game']}</td>
      <td>{$a['stav']}</td>
      <td>{$a['win']}</td>
</tr>
{/foreach}

{else}

<tr><td colspan="4" >{$lang['history_no_game']}</td></tr> 
 		
{/if}
										</table>
									</div>
{*paginator*}
{if isset($stat_nav) && $stat_nav[1]>1}
              <nav class="paging">
								{if $stat_nav[0]>1}<a href="" class="btn-prev" title="Предыдущая" onclick='setCookie("curpagenum", "{$stat_nav[0]- 1}","","/");'>«</a>{/if}
								<ul>
									{if $stat_nav[0]>2}<li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li>{/if}
                  {if $stat_nav[0]>3}<li>..</li>{/if}
                  {if $stat_nav[0]>1}<li><a href="" onclick='setCookie("curpagenum", "{$stat_nav[0]- 1}","","/");'>{$stat_nav[0]- 1}</a></li> {/if}
									<li class="active"><a href="" onclick='return false;'>{$stat_nav[0]}</a></li>
									{if ($stat_nav[0]+1 <=$stat_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$stat_nav[0]+1}","","/");'>{$stat_nav[0]+ 1}</a></li> {/if}  
									{if ($stat_nav[0]+3 <=$stat_nav[1]) }<li>..</li>{/if}
                  {if ($stat_nav[0]+2 <=$stat_nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$stat_nav[1]}","","/");'>{$stat_nav[1]}</a></li>{/if}
								</ul>
								{if ($stat_nav[0]+1 <=$stat_nav[1]) }<a href="" class="btn-prev" title="Следующая" onclick='setCookie("curpagenum", "{$stat_nav[0]+1}","","/");'>»</a>{/if}
							</nav>
{/if}

								</div>
							</div>
						</div>
					</div>
          
          
<script>
  $("#tabset a").on('click', function()
    {
    setCookie('tab', $(this).attr('href'));
    }
  );
</script>          