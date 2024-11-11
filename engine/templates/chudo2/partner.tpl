<div class="content">
						<div class="refill affiliate-program">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
							<div class="refill-details">
								<div class="block">
									<div class="title">
										<h2>{$lang['partner_REF_URL']}</h2>
									</div>
									<div class="form-control">
										<span class="link">http://{$cfgURL}/?ref={$user_id}</span>
										<a class="btn-blue" href="">{$lang['button_COPY']}</a>
									</div>
								</div>
								<div class="table">
									<h2>{$lang['partner_ref_title']}</h2>
									<table>
										<colgroup>
											<col style="width: 51px;" />
											<col />
											<col style="width: 150px;" />
											<col style="width: 150px;" />
											<col style="width: 169px;" />
										</colgroup>
										<tr>
											<th>№</th>
											<th>{$lang['partner_ref']}</th>
											<th>{$lang['partner_all_out']}</th>
											<th>{$lang['partner_to_enter']}</th>
											<th>{$lang['partner_yes_out']}</th>
										</tr>
{if $ref_rows}
  {foreach $ref_rows as $id=>$row}
    <tr>
      <td>{$id}</td>
      <td>{$row['login']}</td>
      <td>{$row['totalpay']}</td>
      <td>{$row.sum1}</td>
      <td>{$row.sum2} {if $row.sum2>0} - [ <a href="/partner?get_ref={$row['ref_id']}" style="color: #ffcc66">{$lang.partner_transfer_to_balance}</a> ]{/if}</td>                                               
    </tr>
  {/foreach}
{else}
  <tr><td colspan="5" align="center" style="border: 0px;">{$lang['partner_no_ref']}</td></tr>  
{/if}
									</table>
								</div>
                
{*paginator*}
{if isset($nav) && $nav[1]>1}
              <nav class="paging">
								{if $nav[0]>1}<a href="" class="btn-prev" title="Предыдущая" onclick='setCookie("curpagenum", "{$nav[0]- 1}","","/");'>«</a>{/if}
								<ul>
									{if $nav[0]>2}<li><a href="" onclick='setCookie("curpagenum", "1","","/");'>1</a></li>{/if}
                  {if $nav[0]>3}<li>..</li>{/if}
                  {if $nav[0]>1}<li><a href="" onclick='setCookie("curpagenum", "{$nav[0]- 1}","","/");'>{$nav[0]- 1}</a></li> {/if}
									<li class="active"><a href="" onclick='return false;'>{$nav[0]}</a></li>
									{if ($nav[0]+1 <=$nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$nav[0]+1}","","/");'>{$nav[0]+ 1}</a></li> {/if}  
									{if ($nav[0]+3 <=$nav[1]) }<li>..</li>{/if}
                  {if ($nav[0]+2 <=$nav[1]) }<li><a href="" onclick='setCookie("curpagenum", "{$nav[1]}","","/");'>{$nav[1]}</a></li>{/if}
								</ul>
								{if ($nav[0]+1 <=$nav[1]) }<a href="" class="btn-prev" title="Следующая" onclick='setCookie("curpagenum", "{$nav[0]+1}","","/");'>»</a>{/if}
							</nav>
{/if}
                
                
							</div>
						</div>
					</div>