class 'AdvancedChatHooks'

local m_StoreManager = require "StoreManager"

function AdvancedChatHooks:__init()
	self.m_CursorMode = false

	-- Install our hooks.
	self.m_EnableCursorModeHook = Hooks:Install('UI:EnableCursorMode', 999, self, self.OnEnableCursorMode)
	self.m_InputConceptEventHook = Hooks:Install('UI:InputConceptEvent', 999, self, self.OnInputConceptEvent)

	-- Subscribe to events.
	self.m_DisableMouseEvent = Events:Subscribe('AC:DisableMouse', self, self.OnDisableMouse)
	self.m_EnableMouseEvent = Events:Subscribe('AC:EnableMouse', self, self.OnEnableMouse)
end

function AdvancedChatHooks:OnInputConceptEvent(p_Hook, p_EventType, p_Action)
	-- If this is a chat-related input concept event then filter it
	-- to prevent the game from showing the default chat dialog.
	print("OnInputConceptEvent")

	if p_Action == UIInputAction.UIInputAction_SayAllChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		m_StoreManager:Dispatch("EnableTyping", "all")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	if p_Action == UIInputAction.UIInputAction_TeamChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		m_StoreManager:Dispatch("EnableTyping", "team")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	if p_Action == UIInputAction.UIInputAction_SquadChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		m_StoreManager:Dispatch("EnableTyping", "squad")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	if p_Action == UIInputAction.UIInputAction_ToggleChat and p_EventType == UIInputActionEventType.UIInputActionEventType_Pressed then
		m_StoreManager:Dispatch("ToggleDisplayMode")
		p_Hook:Pass(UIInputAction.UIInputAction_None, p_EventType)
		return
	end

	-- Otherwise, let the game handle it as it normally does.
end

function AdvancedChatHooks:OnEnableCursorMode(p_Hook, p_Enable, p_Cursor)
	-- Here we store the current cursor mode as requested by the
	-- engine in order to restore it later on.

	print("OnEnableCursorMode, enable: "..tostring(p_Enable))
	self.m_CursorMode = p_Enable
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

function AdvancedChatHooks:OnEnableMouse()
	-- The WebUI has requested us to enable mouse input.
	-- If mouse input is already enabled we will ignore
	-- this request.

	print("OnEnableMouse")
	if self.m_CursorMode then
		print("mouse already enabled, ignoring")
		return
	end

	print("mouse disabled, enabling")

	-- Otherwise, we will proceed to enabling it.
	WebUI:EnableMouse()
end

return AdvancedChatHooks