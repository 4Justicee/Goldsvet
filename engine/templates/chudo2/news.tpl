					<div class="content">
						<div class="refill news">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
{foreach $news as $new}
							<div class="news-item">
								<header class="heading-block">
									<h2>{$new[1]}</h2>
									<span class="date">{$new[3]}</span>
								</header>
								<div class="holder">
									<div class="text-holder">
										<p>{$new[2]}</p>
										<div class="right">
											<a href="/{$ge}?id={$new[0]}">{$lang['news_more']}</a>
										</div>
									</div>
								</div>
							</div>
{/foreach}

{*paginator*}
{if $nav[1]>1}
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

{if isset($cur_new)}
							<div class="news-item">
								<header class="heading-block">
									<h2>{$cur_new[1]}</h2>
									<span class="date">{$cur_new[0]}</span>
								</header>
								<div class="holder">
									<div class="text-holder">
										<p>{$cur_new[2]}</p>
									</div>
								</div>
							</div>
{/if}
						</div>
					</div>