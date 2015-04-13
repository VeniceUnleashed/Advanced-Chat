function OnLoaded()
	-- Initialize our custom WebUI package.
	WebUI:Init()

	-- Show our custom WebUI package.
	WebUI:Show()

	return true
end

function OnSendChatMessage(p_Contents)
	-- Get the target of the message and the message itself.
	local s_Target = p_Contents:match("^([a-z]+):.*$")
	local s_Message = p_Contents:match("^[a-z]+:(.*)$")

	-- Trim the message.
	local s_From = s_Message:match"^%s*()"
 	s_Message = s_From > #s_Message and "" or s_Message:match(".*%S", s_From)

	-- Ignore if the message is empty.
	if s_Message:len() == 0 then
		return true
	end

	-- Get the local player.
	local s_LocalPlayer = PlayerManager:GetLocalPlayer()

	-- We can't send a message if we don't have an active player.
	if s_LocalPlayer == nil then
		return true
	end

	-- Dispatch message based on the specified target.
	if s_Target == 'all' then
		ChatManager:SendMessage(s_Message)
		return true
	end

	if s_Target == 'team' then
		ChatManager:SendMessage(s_Message, s_LocalPlayer.teamID)
		return true
	end

	if s_Target == 'sqd' then
		ChatManager:SendMessage(s_Message, s_LocalPlayer.teamID, s_LocalPlayer.squadID)
		return true
	end

	return true
end

Events:Subscribe('ExtensionLoaded', OnLoaded)
Events:Subscribe('SendChatMessage', OnSendChatMessage)
