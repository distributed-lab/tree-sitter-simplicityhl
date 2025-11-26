package tree_sitter_simplicityhl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_simplicityhl "github.com/distributed-lab/tree-sitter-simplicityhl.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_simplicityhl.Language())
	if language == nil {
		t.Errorf("Error loading SimplicityHL grammar")
	}
}
