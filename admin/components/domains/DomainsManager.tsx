"use client";

import { useEffect, useState, useCallback } from "react";
import DomainsStats from "./DomainsStats";
import DomainsTable from "./DomainsTable";
import { fetchDomains, removeDomain, type DomainRow, type DomainStats } from "@/lib/adminDomains";

export default function DomainsManager() {
  const [domains, setDomains] = useState<DomainRow[]>([]);
  const [stats, setStats] = useState<DomainStats>({ total: 0, live: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchDomains();
    if (res.success) {
      setDomains(res.domains);
      setStats(res.stats);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function onRemove(id: number) {
    if (!confirm("Remove this custom domain?")) return;
    const res = await removeDomain(id);
    if (!res.success) alert(res.message || "Failed to remove domain.");
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <DomainsStats stats={stats} />
      <DomainsTable domains={domains} loading={loading} onRemove={onRemove} />
    </div>
  );
}