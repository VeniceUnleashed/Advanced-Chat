class 'AdvancedChatHooks'

function AdvancedChatHooks:__init()
	self.m_CursorMode = false

	-- Install our hooks.
	self.m_EnableCursorModeHook = Hooks:Install('UI:EnableCursorMode', self, self.OnEnableCursorMode)
	self.m_CreateChatMessageHook = Hooks:Install('UI:CreateChatMessage', self, self.OnCreateChatMessage)
	self.m_InputConceptEventHook = Hooks:Install('UI:InputConceptEvent', self, self.OnInputConceptEvent)

	-- Subscribe to events.
	self.m_DisableMouseEvent = Events:Subscribe('AC:DisableMouse', self, self.OnDisableMouse)
end

function AdvancedChatHooks:OnCreateChatMessage(p_Hook, p_Message, p_Channel, p_Player, p_RecipientMask, p_SenderIsDead)
	-- A new chat message is being created; filter it in order to
	-- prevent the game from rendering it.
	
	return UITextMessageType.Last
end

function AdvancedChatHooks:OnInputConceptEvent(p_Hook, p_EventType, p_Action)
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

function AdvancedChatHooks:OnEnableCursorMode(p_Hook, p_Enable, p_Cursor)
	-- Here we store the current cursor mode as requested by the
	-- engine in order to restore it later on.
	self.m_CursorMode = p_Enable

	p_Hook:CallOriginal(p_Enable, p_Cursor)
end

function AdvancedChatHooks:OnDisableMouse()
	-- The WebUI has requested us to disable mouse input.
	-- If mouse input was previously enabled by the engine
	-- we will ignore this request.
	if self.m_CursorMode then
		return
	end

	-- Otherwise, we will proceed to disabling it.
	WebUI:DisableMouse()
end

local hooks = AdvancedChatHooks()