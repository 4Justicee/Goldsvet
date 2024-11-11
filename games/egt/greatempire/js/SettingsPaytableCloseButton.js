Button("SettingsPaytableCloseButton",
{
},
(function()
{
	var p =
	{
		init: function(x, y, hitArea)
		{
			this._super("settingsPaytableCloseButton", x, y, hitArea, true);

			this.addChild(new View("settingsPaytableCloseButtonArrow", 10, 0));
		},
		
		dispose: function()
		{
			this._super();
		}
	};
	
	return p;
})());