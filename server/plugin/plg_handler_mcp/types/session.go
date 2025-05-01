package types

import (
	"time"

	. "github.com/DanielLob-o/filestash_rework/server/common"
)

type UserSession struct {
	Id      string
	Chan    chan JSONRPCRequest
	HomeDir string
	CurrDir string
	Token   string
	Backend IBackend
	Ping    Ping
}

type Ping struct {
	ID           uint64
	LastResponse time.Time
}
