function OnCreateChatMessage(p_Hook, p_Message, p_Channel, p_Player, p_RecipientMask, p_SenderIsDead)
	-- A new chat message is being created; filter it in order to
	-- prevent the game from rendering it, and pass it to our custom
	-- WebUI package.

	if p_Channel == ChatChannelType.Admin then
		-- This is a workaround because many RCON tools prepend
		-- "Admin: " to admin messages.
		local s_Message = p_Message:gsub("^Admin: ", '')
		
		WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:all", "Admin", %s);', WebUI:QuoteString(s_Message)))
		return UITextMessageType.Last
	end

	-- Get the player sending the message, and our local player.
	local s_OtherPlayer = PlayerManager:GetPlayerByID(p_Player)
	local s_LocalPlayer = PlayerManager:GetLocalPlayer()

	-- Players not found; cancel.
	if s_OtherPlayer == nil or s_LocalPlayer == nil then
		return UITextMessageType.Last
	end

	-- Player is on a different team; display enemy message.
	if s_OtherPlayer.teamID ~= s_LocalPlayer.teamID then
		WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:enemy", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		return UITextMessageType.Last
	end

	-- Player is in the same team.
	-- Display global message.
	if p_Channel == ChatChannelType.SayAll then
		WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:all", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		return UITextMessageType.Last
	end

	-- Display team message.
	if p_Channel == ChatChannelType.Team then
		WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:team", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		return UITextMessageType.Last
	end

	-- Display squad message.
	if p_Channel == ChatChannelType.Squad or p_Channel == ChatChannelType.SquadLeader then
		WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:squad", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		return UITextMessageType.Last
	end

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
