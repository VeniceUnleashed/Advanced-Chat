class 'AdvancedChatHooks'

local m_StoreManager = require "StoreManager"

function AdvancedChatHooks:__init()
	self.m_CursorMode = false

	-- Install our hooks.
	self.m_EnableCursorModeHook = Hooks:Install('UI:EnableCursorMode', 999, self, self.OnEnableCursorMode)
	self.m_InputConceptEventHook = Hooks:Install('UI:InputConceptEvent', 999, self, self.OnInputConceptEvent)

	-- Subscribe to events.
	self.m_DisableMouseEvent = Events:Subscribe('AC:DisableMouse', self, self.OnDisableMouse)
end

function AdvancedChatHooks:OnInputConceptEvent(p_Hook, p_EventType, p_Action)
	-- If this is a chat-related input concept event then filter it
	-- to prevent the game from showing the default chat dialog.
	print("OnInputConceptEvent")

	if p_Action == UIInputAction.UIInputAction_SayAllChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		--WebUI:ExecuteJS('AdvancedChat.trigger("enable_typing", "all")')
		m_StoreManager:Dispatch("EnableTyping", "all")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	if p_Action == UIInputAction.UIInputAction_TeamChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		--WebUI:ExecuteJS('AdvancedChat.trigger("enable_typing", "team")')
		m_StoreManager:Dispatch("EnableTyping", "team")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	if p_Action == UIInputAction.UIInputAction_SquadChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		--WebUI:ExecuteJS('AdvancedChat.trigger("enable_typing", "sqd")')
		m_StoreManager:Dispatch("EnableTyping", "squad")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	if p_Action == UIInputAction.UIInputAction_ToggleChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		--WebUI:ExecuteJS('AdvancedChat.trigger("toggle_mode")')
		m_StoreManager:Dispatch("ToggleDisplayMode")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	-- Otherwise, let the game handle it as it normally does.
end

function AdvancedChatHooks:OnEnableCursorMode(p_Hook, p_Enable, p_Cursor)
	-- Here we store the current cursor mode as requested by the
	-- engine in order to restore it later on.
	self.m_CursorMode = p_Enable
	print("OnEnableCursorMode")
end

function AdvancedChatHooks:OnDisableMouse()
	-- The WebUI has requested us to disable mouse input.
	-- If mouse input was previously enabled by the engine
	-- we will ignore this request.

	print("OnDisableMouse")
	if self.m_CursorMode then
		return
	end

	-- Otherwise, we will proceed to disabling it.
	WebUI:DisableMouse()
end

return AdvancedChatHooks