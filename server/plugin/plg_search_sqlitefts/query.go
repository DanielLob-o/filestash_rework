package plg_search_sqlitefts

import (
	. "github.com/DanielLob-o/filestash_rework/server/common"
	. "github.com/DanielLob-o/filestash_rework/server/plugin/plg_search_sqlitefts/crawler"
)

type SearchEngine struct{}

func (this SearchEngine) Query(app App, path string, keyword string) ([]IFile, error) {
	DaemonState.HintLs(&app, path)
	s := GetCrawler(&app)
	if s == nil {
		return nil, ErrNotReachable
	}
	if path == "" {
		path = "/"
	}
	return s.State.Search(path, keyword)
}
