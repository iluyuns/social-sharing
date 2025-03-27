// 一个静态服务器，gin 实现
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Static("/", "./")
	r.Run(":8888")
}
