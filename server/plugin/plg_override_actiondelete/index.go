package plg_override_actiondelete

import (
	"embed"

	. "github.com/DanielLob-o/filestash_rework/server/common"
)

//go:embed assets/*
var STATIC embed.FS

func init() {
	Hooks.Register.StaticPatch(STATIC)
}
