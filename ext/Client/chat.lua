function OnLoaded()
	WebUI:Init()
	WebUI:Show()

	return true
end

function OnSendChatMessage(p_Contents)
	local s_Target = p_Contents:match("^([a-z]+):.*$")
	local s_Message = p_Contents:match("^[a-z]+:(.*)$")

	if s_Message:len() == 0 then
		return true
	end

	if s_Target == 'all' then
		ChatManager:SendMessage(s_Message)
		return true
	end

	return true
end

Events:Subscribe('ExtensionLoaded', OnLoaded)
Events:Subscribe('SendChatMessage', OnSendChatMessage)
