local AdvancedChatHooks = require 'hooks'
local AdvancedChatMessages = require 'messages'

class 'AdvancedChat'

function AdvancedChat:__init()
	-- Subscribe to events.
	self.m_ExtensionLoadedEvent = Events:Subscribe('Extension:Loaded', self, self.OnLoaded)
	self.m_ChatMessageEvent = Events:Subscribe('AC:SendChatMessage', self, self.OnSendChatMessage)

	-- Initialize the other components.
	self.m_Hooks = AdvancedChatHooks()
	self.m_Messages = AdvancedChatMessages()
end

function AdvancedChat:OnLoaded()
	-- Initialize our custom WebUI package.
	WebUI:Init()

	-- Show our custom WebUI package.
	WebUI:Show()
end

function AdvancedChat:OnSendChatMessage(p_Contents)
	-- Get the target of the message and the message itself.
	local s_Target = p_Contents:match("^([a-z]+):.*$")
	local s_Message = p_Contents:match("^[a-z]+:(.*)$")

	-- Trim the message.
	local s_From = s_Message:match"^%s*()"
 	s_Message = s_From > #s_Message and "" or s_Message:match(".*%S", s_From)

	-- Ignore if the message is empty.
	if s_Message:len() == 0 then
		return
	end

	-- Get the local player.
	local s_LocalPlayer = PlayerManager:GetLocalPlayer()

	-- We can't send a message if we don't have an active player.
	if s_LocalPlayer == nil then
		return
	end

	print("message: "..s_Message..", target: "..s_Target)

	-- Dispatch message based on the specified target.
	if s_Target == 'all' then
		ChatManager:SendMessage(s_Message)
		return
	end

	if s_Target == 'team' then
		ChatManager:SendMessage(s_Message, s_LocalPlayer.teamId)
		return
	end

	if s_Target == 'squad' then
		ChatManager:SendMessage(s_Message, s_LocalPlayer.teamId, s_LocalPlayer.squadId)
		return
	end

	return
end

g_AdvancedChat = AdvancedChat()