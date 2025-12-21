import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Password } from "@/features/password-manager/types/SenhasType";
import PasswordCard from "./PasswordCard";
import usePassword from "@/features/password-manager/utils/usePassword";

export function PasswordServiceGroup({ passwords }: { passwords: Password[] }) {
  // ==== AGRUPAMENTO ====
  const grouped = passwords.reduce((acc, p) => {
    if (!acc[p.name]) acc[p.name] = [];
    acc[p.name].push(p);
    return acc;
  }, {} as Record<string, Password[]>);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { getFaviconUrl } = usePassword();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Object.entries(grouped).map(([serviceName, list]) => {
        const isOpen = openGroups[serviceName] || false;

        const toggleOpen = () => {
          setOpenGroups((prev) => ({
            ...prev,
            [serviceName]: !prev[serviceName],
          }));
        };
        const faviconUrl = getFaviconUrl(list[0].url);
        const hasCompromised = list.some((p) => p.strength === "weak");

        const usernames = list.map((p) => p.username).join(", ");
        const shortUsernames =
          usernames.length > 40
            ? usernames.substring(0, 40) + "..."
            : usernames;

        return (
          <Collapsible
            open={isOpen}
            onOpenChange={toggleOpen}
            key={serviceName}
          >
            <Card className="overflow-hidden border-[hsl(var(--primary))]/20 hover:border-[hsl(var(--primary))]/40 transition-colors">
              <CollapsibleTrigger asChild>
                <CardContent className="p-4 py-10 cursor-pointer hover:bg-[hsl(var(--muted))]/50 transition-colors">
                  <div className="flex items-center  justify-between">
                    <div className="flex items-center gap-3">
                      {faviconUrl ? (
                        <img
                          src={faviconUrl}
                          alt={serviceName}
                          className="h-10 w-10 rounded-lg object-contain bg-[hsl(var(--muted))] p-1"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-[hsl(var(--primary))]" />
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {serviceName}
                          <Badge variant="secondary" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {list.length} contas
                          </Badge>
                        </h3>

                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          {shortUsernames}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasCompromised && (
                        <Badge variant="destructive" className="text-xs">
                          Atenção
                        </Badge>
                      )}

                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4 pt-0 border-t border-[hsl(var(--border))]/40">
                  <div className="pt-4 space-y-3">
                    {list.map((password) => (
                      <PasswordCard
                        favicon={faviconUrl}
                        key={password.id}
                        password={password}
                      />
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
