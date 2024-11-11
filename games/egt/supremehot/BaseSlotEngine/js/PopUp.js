/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

View("PopUp",
{
	BUTTON1_CLICK: "button1Click",
	BUTTON2_CLICK: "button2Click",
	
	POPUP_WIDTH: 512,
	POPUP_HEIGHT_WITHOUT_CONTENT: 245,
	POPUP_HEIGHT_WITH_CONTENT: 400,
	BUTTON_WIDTH: 150,
	BUTTON_HEIGHT: 70
},
(function()
{
	var p = 
	{
		init: function(title, content, button1Text, button2Text)
		{
			this._super("popUpOverlay");
			
			this._button1 = null;
			this._button2 = null;
			this._scrollView = null;
			
			var popUpMiddle = new View("popUpMiddle");
			popUpMiddle.setPositionType("initial");

			var popUpView = new View("popUpView boxStyle");
			popUpView.setPositionType("initial");

			var buttonContainerWrapper = new View("buttonContainerWrapper");
			buttonContainerWrapper.setPositionType("initial");
			var buttonContainer = new View("buttonContainer");
			buttonContainer.setPositionType("initial");

			buttonContainerWrapper.addChild(buttonContainer);
			
			if(button1Text && button1Text != "")
			{
				this._button1 = new Button("popUpButton boxStyle");
				this._button1._containerDiv.removeAttr("style");
				this._button1.addChild(new TextView("buttonsLabel", button1Text, 0, 14));
			}
			if(button2Text && button2Text != "")
			{
				this._button2 = new Button("popUpButton boxStyle");
				this._button2._containerDiv.removeAttr("style");
				this._button2.addChild(new TextView("buttonsLabel", button2Text, 0, 14));
			}
			
			var titleTextView = new TextView("titleLabel", title, 0, content ? 13 : 38);
			titleTextView.setPositionType("initial");
			popUpView.addChild(titleTextView);
			
			if(content)
			{
				var contentText = new TextView("contentText", content)
				contentText.setPositionType("initial");
				popUpView.addChild(contentText);
			}
			
			if(this._button1)
			{
				this._button1.addClass(this._button2 ? "leftButton" : "centerButton");
				this._button1.addEventListener(MouseEvent.CLICK, onButtonClick, this);
				buttonContainer.addChild(this._button1);
			}
			if(this._button2)
			{
				this._button2.addClass(this._button1 ? "rightButton" : "centerButton");
				this._button2.addEventListener(MouseEvent.CLICK, onButtonClick, this);
				buttonContainer.addChild(this._button2);
			}

			popUpView.addChild(buttonContainerWrapper);
			
			popUpMiddle.addChild(popUpView);
			this.addChild(popUpMiddle);
		},
		
		setButtonIds: function(button1Id, button2Id)
		{
			if(this._button1)
				this._button1.setId(button1Id);
			if(this._button2)
				this._button2.setId(button2Id);
		},
		
		dispose: function()
		{
			this._super();
			
			if(this._button1)
			{
				this._button1.removeEventListener(MouseEvent.CLICK, onButtonClick, this);
				this._button1.dispose();
			}
			if(this._button2)
			{
				this._button2.removeEventListener(MouseEvent.CLICK, onButtonClick, this);
				this._button2.dispose();
			}
			if(this._scrollView)
				this._scrollView.dispose();
		}
	};
	
	function onButtonClick(event)
	{
		if(event.target == this._button1)
			this.dispatchEvent(new Event(PopUp.BUTTON1_CLICK));
		else if(event.target == this._button2)
			this.dispatchEvent(new Event(PopUp.BUTTON2_CLICK));
	}
	
	return p;
})());