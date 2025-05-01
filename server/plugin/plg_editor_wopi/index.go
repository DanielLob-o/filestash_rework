package plg_editor_wopi

import (
	. "github.com/DanielLob-o/filestash_rework/server/common"
)

func init() {
	Hooks.Register.Onload(func() {
		server_url()
		origin()
		rewrite_url()
		if plugin_enable() {
			Hooks.Register.XDGOpen(WOPIOverrides)
		}
	})
	Hooks.Register.HttpEndpoint(WOPIRoutes)
}
