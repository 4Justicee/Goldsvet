<div class="content">
<div class="refill">

							<div class="heading">
								<h1>{$title}</h1>
								<div class="texts">
									<p>{$sub_title}</p>
								</div>
							</div>
</div>
	<div class="dk_body">
		
		<div class="dk_ballance">
		<div class="dk_ballance_h">{$lang['exchange_TOTAL_BALANCE_POINTS']}</div>
	     <div class="dk_ballance_sum">{$point_pay}</div>
		</div>
	 
		<div class="dk_form_ex">
			<form action="?action=exchange" method='post'>
				<div class="dk_form_elem">
				<div class="dk_inp_h">{$lang['exchange_POINTS_EX']}</div>
					<input type="text" name="sumpoints" class="dk_f_input" placeholder="0" value="{$point_pay}">
				</div>
				
				<div class="dk_form_elem2">
					<div class="dk_inp_h">{$lang['exchange_EX_POINTS']}</div>
					<input type="text" name="sumcredits" class="dk_f_input" placeholder="0" value="{sprintf('%01.2f',$point_pay*$point_cours)}">
				</div>
				
			<div class="dk_f_foot">
				<div class="dk_form_info">
				<span>{$lang['exchange_COURSE']}:</span>
			     <div>1000 Cr = {$point_cours*1000} {$lang['exchange_cur']}</div>
				</div>
				<br />
				<div class="right">
					<input type="submit" value="{$lang['button_EXCHANGE']}" class="btn-green" style="width: 220px;" />
				</div>				
			</div>
			</form>
		</div>
	
	</div>

</div>
<script>
  var course={$point_cours};
  var points={$point_pay};
  $("input[name=sumpoints]").on("change", function(){
     if(this.value>points)
      {
      this.value=points;
      } 
     $("input[name=sumcredits]").val($("input[name=sumpoints]").val()*course);
  });
  
  $("input[name=sumcredits]").on("change", function(){
     if(this.value/course>points)
      {
      this.value=points*course;
      } 
     $("input[name=sumpoints]").val($("input[name=sumcredits]").val()/course);
  });
</script>