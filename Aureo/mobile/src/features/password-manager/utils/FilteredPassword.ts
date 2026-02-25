import { View, Text } from "react-native";
import React, { useContext, useMemo, useState } from "react";
import { ContextPassword } from "../context/PasswordContext";

const useFilterPassword = () => {
  const { Password } = useContext(ContextPassword);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "compromised">("all");

  const filteredPasswords = useMemo(() => {
    return Password.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.url?.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeTab === "compromised") {
        return (
          matchesSearch && (p.strength === "weak" || p.strength === "medium")
        );
      }

      return matchesSearch;
    });
  }, [Password, searchQuery, activeTab]);

  const compromisedCount = Password.filter(
    (p) => p.strength === "weak" || p.strength === "medium"
  ).length;

  return {
    filteredPasswords,
    compromisedCount,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
  };
};

export { useFilterPassword };
