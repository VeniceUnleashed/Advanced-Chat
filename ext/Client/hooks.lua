function OnCreateChatMessage(p_Hook, p_Message, p_Channel, p_Player, p_RecipientMask, p_SenderIsDead)
	-- A new chat message is being created; filter it in order to
	-- prevent the game from rendering it.
	
	return UITextMessageType.Last
end

function OnInputConceptEvent(p_Hook, p_EventType, p_Action)
	-- If this is a chat-related input concept eventm then filter it
	-- to prevent the game from showing the default chat dialog.

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

	-- Otherwise, let the game handle it as it normally does.
	p_Hook:CallOriginal(p_EventType, p_Action)
end

Hooks:Install('UI:CreateChatMessage', OnCreateChatMessage)
Hooks:Install('UI:InputConceptEvent', OnInputConceptEvent)
