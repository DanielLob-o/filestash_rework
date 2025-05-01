package plg_search_sqlitefts

import (
	. "github.com/DanielLob-o/filestash_rework/server/common"
	. "github.com/DanielLob-o/filestash_rework/server/plugin/plg_search_sqlitefts/crawler"
)

func init() {
	Hooks.Register.SearchEngine(SearchEngine{})
	Hooks.Register.AuthorisationMiddleware(FileHook{})
}
