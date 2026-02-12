import { View, Text, LayoutAnimation } from "react-native";
import React, { useState } from "react";
import { Password } from "../types/passwordTypes";

const useGroupPassword = (passwords: Password[]) => {
  // ===== AGRUPAMENTO =====
  const grouped = passwords.reduce((acc, p) => {
    if (!acc[p.name]) acc[p.name] = [];
    acc[p.name].push(p);
    return acc;
  }, {} as Record<string, Password[]>);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  function toggleGroup(serviceName: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setOpenGroups((prev) => ({
      ...prev,
      [serviceName]: !prev[serviceName],
    }));
  }

  return { grouped, toggleGroup, openGroups };
};

export { useGroupPassword };
