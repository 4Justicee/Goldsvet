/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function CollectMessage(state)
{
	this.type = BaseMessage.COLLECT;
	this.state = state;
	this.winAmount = 0;
}