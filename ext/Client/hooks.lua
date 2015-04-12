function OnCreateChatMessage(p_Hook, p_Message, p_Channel, p_Player, p_RecipientMask, p_SenderIsDead)
	print(string.format('Got a chat message from player %d (%d, %d)', p_Player, p_Channel, p_RecipientMask))
	WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:all", "NoFaTe", %s);', WebUI:QuoteString(p_Message)))

	return UITextMessageType.Last
end

function OnInputConceptEvent(p_Hook, p_EventType, p_Action)
	if p_Action == UIInputAction.SayAllChat and p_EventType == UIInputActionEventType.Pressed then
		WebUI:ExecuteJS('AdvancedChat.trigger("enable_typing", "all")')
		return
	end

	if p_Action == UIInputAction.TeamChat and p_EventType == UIInputActionEventType.Pressed then
		WebUI:ExecuteJS('AdvancedChat.trigger("enable_typing", "team")')
		return
	end

	if p_Action == UIInputAction.SquadChat and p_EventType == UIInputActionEventType.Pressed then
		WebUI:ExecuteJS('AdvancedChat.trigger("enable_typing", "sqd")')
		return
	end

	if p_Action == UIInputAction.ToggleChat and p_EventType == UIInputActionEventType.Pressed then
		WebUI:ExecuteJS('AdvancedChat.trigger("toggle_mode")')
		return
	end

	p_Hook:CallOriginal(p_EventType, p_Action)
end

Hooks:Install('UI:CreateChatMessage', OnCreateChatMessage)
Hooks:Install('UI:InputConceptEvent', OnInputConceptEvent)
