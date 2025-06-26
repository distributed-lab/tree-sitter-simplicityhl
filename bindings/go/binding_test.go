package tree_sitter_simfony_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_simfony "github.com/velnbur/tree-sitter-simfony.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_simfony.Language())
	if language == nil {
		t.Errorf("Error loading Simfony grammar")
	}
}
