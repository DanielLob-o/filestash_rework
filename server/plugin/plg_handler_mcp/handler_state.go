package plg_handler_mcp

import (
	"strings"
	"time"

	. "github.com/DanielLob-o/filestash_rework/server/common"
	. "github.com/DanielLob-o/filestash_rework/server/plugin/plg_handler_mcp/types"
)

func (this *Server) RemoveSession(userSession *UserSession) {
	this.expired.Store(Hash(userSession.Token, 16), nil)
	this.sessions.Delete(userSession.Id)
}

func (this *Server) ValidateToken(token string) string {
	if hasToken := strings.HasPrefix(token, "Bearer "); hasToken == false {
		return ""
	}
	token = strings.TrimPrefix(token, "Bearer ")
	if _, ok := this.expired.Load(Hash(token, 16)); ok {
		return ""
	}
	return token
}

func (this *Server) GetSession(uuid string) UserSession {
	ch, _ := this.sessions.LoadOrStore(uuid, UserSession{
		Id:      uuid,
		Chan:    make(chan JSONRPCRequest),
		CurrDir: "/",
		HomeDir: "/",
		Ping: Ping{
			ID:           0,
			LastResponse: time.Now(),
		},
	})
	return ch.(UserSession)
}
