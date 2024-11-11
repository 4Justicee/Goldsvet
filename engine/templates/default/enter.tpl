<div class="content">
  {if !isset($system)}
  <div class="refill">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
 {else}
    <div class="refill confirm">
							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
 {/if}             
							<div class="refill-details">
				{foreach $pay_mods as $mod}
                  {include file="inpay/$mod.tpl"}
                {/foreach}
							</div>
	</div>
</div>


