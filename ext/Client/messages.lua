class 'AdvancedChatMessages'

local m_StoreManager = require "StoreManager"

function AdvancedChatMessages:__init()
	-- Subscribe to events.
	self.m_CreateChatMessage = Hooks:Install('UI:CreateChatMessage',999, self, self.OnCreateChatMessage)
end

function AdvancedChatMessages:OnCreateChatMessage(p_Hook, p_Message, p_Channel, p_PlayerId, p_RecipientMask, p_SenderIsDead)
	if p_Message == nil then
		return
	end

	print("OnCreateChatMessage")

	-- Get the player sending the message, and our local player.
	local s_OtherPlayer = PlayerManager:GetPlayerById(p_PlayerId)
	local s_LocalPlayer = PlayerManager:GetLocalPlayer()
	
	if p_Channel == ChatChannelType.Admin then
		-- This is a workaround because many RCON tools prepend
		-- "Admin: " to admin messages.
		local s_String = p_Message:gsub("^Admin: ", '')

		print(string.format('AdvancedChat.trigger("message:all", "Admin", %s);', WebUI:QuoteString(s_String)))
		goto continue
	end


	-- Players not found; cancel.
	if s_OtherPlayer == nil or s_LocalPlayer == nil then
		goto continue
	end

	local s_Target

	-- Player is a spectator.
	if s_OtherPlayer.teamId == 0 then
		--WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:spectator", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		s_Target = "spectator"

		-- Player is on a different team; display enemy message.
	elseif (s_LocalPlayer.teamId == 0 and s_OtherPlayer.teamId == 2) or (s_LocalPlayer.teamId ~= 0 and s_OtherPlayer.teamId ~= s_LocalPlayer.teamId) then
		--WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:enemy", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		s_Target = "enemy"

		-- Player is in the same team.
		-- Display global message.
	elseif p_Message.channel == ChatChannelType.SayAll and s_LocalPlayer.teamId ~= 0 then
		--WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:all", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		s_Target = "all"

		-- Display team message.
	elseif p_Message.channel == ChatChannelType.Team or s_LocalPlayer.teamId == 0 then
		--WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:team", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		s_Target = "team"

		-- Display squad message.
	elseif p_Message.channel == ChatChannelType.Squad or p_Message.channel == ChatChannelType.SquadLeader then
		--WebUI:ExecuteJS(string.format('AdvancedChat.trigger("message:squad", %s, %s);', WebUI:QuoteString(s_OtherPlayer.name), WebUI:QuoteString(p_Message)))
		s_Target = "squad"
	else
		goto continue
	end

	local s_Table = {author = s_OtherPlayer.name, content = p_Message, target = "spectator"}
	print('OnMessage, '.. json.encode(s_Table))
	m_StoreManager:Commit("OnMessage", s_Table)

	::continue::

	-- A new chat message is being created; 
	-- prevent the game from rendering it.
	p_Hook:Return(UITextMessageType.Last)
end

return AdvancedChatMessages