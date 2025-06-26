package tree_sitter_simfony_test

import (
	"testing"

	tree_sitter_simfony "github.com/distributed-lab/tree-sitter-simfony/bindings/go"
	tree_sitter "github.com/tree-sitter/go-tree-sitter"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_simfony.Language())
	if language == nil {
		t.Errorf("Error loading Simfony grammar")
	}
}
