import {
  createHotContext
} from "/build/_shared/chunk-5YHBI2JG.js";

// app/lib/mock-api.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\mock-api.ts"
  );
  import.meta.hot.lastModified = "1774603349071.2346";
}
var MOCK_API_BASE = process.env.MOCK_API_BASE_URL ?? "http://127.0.0.1:4000";
async function listKols() {
  const res = await fetch(`${MOCK_API_BASE}/kols`);
  return res.json();
}
async function getKol(id) {
  const res = await fetch(`${MOCK_API_BASE}/kols/${id}`);
  if (res.status === 404)
    return null;
  return res.json();
}
async function listProposals() {
  const res = await fetch(`${MOCK_API_BASE}/proposals`);
  return res.json();
}
async function updateProposal(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/proposals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function deleteProposal(id) {
  const res = await fetch(`${MOCK_API_BASE}/proposals/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function getProposal(id) {
  const res = await fetch(`${MOCK_API_BASE}/proposals/${id}`);
  if (res.status === 404)
    return null;
  return res.json();
}
async function listProposalKols(proposalId) {
  const res = await fetch(`${MOCK_API_BASE}/proposalKols?proposalId=${proposalId}`);
  return res.json();
}
async function addProposalKol(data) {
  const payload = { ...data, status: "pending", feedbackText: "" };
  const res = await fetch(`${MOCK_API_BASE}/proposalKols`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
async function updateProposalKolStatus(id, status, feedbackText) {
  const res = await fetch(`${MOCK_API_BASE}/proposalKols/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, feedbackText })
  });
  return res.json();
}
async function deleteProposalKol(id) {
  const res = await fetch(`${MOCK_API_BASE}/proposalKols/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function listInsertionOrders() {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders`);
  return res.json();
}
async function listTagCatalog() {
  try {
    const res = await fetch(`${MOCK_API_BASE}/tagCatalog`);
    if (!res.ok)
      return [];
    return res.json();
  } catch (e) {
    return [];
  }
}
async function addTagCatalog(data) {
  const res = await fetch(`${MOCK_API_BASE}/tagCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function updateTagCatalog(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/tagCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function deleteTagCatalog(id) {
  const res = await fetch(`${MOCK_API_BASE}/tagCatalog/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function listBrandCatalog() {
  try {
    const res = await fetch(`${MOCK_API_BASE}/brandCatalog`);
    if (!res.ok)
      return [];
    return res.json();
  } catch (e) {
    return [];
  }
}
async function addBrandCatalog(data) {
  const res = await fetch(`${MOCK_API_BASE}/brandCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function updateBrandCatalog(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/brandCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function deleteBrandCatalog(id) {
  const res = await fetch(`${MOCK_API_BASE}/brandCatalog/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function listIndustryCatalog() {
  try {
    const res = await fetch(`${MOCK_API_BASE}/industryCatalog`);
    if (!res.ok)
      return [];
    return res.json();
  } catch (e) {
    return [];
  }
}
async function addIndustryCatalog(data) {
  const res = await fetch(`${MOCK_API_BASE}/industryCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function updateIndustryCatalog(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/industryCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function deleteIndustryCatalog(id) {
  const res = await fetch(`${MOCK_API_BASE}/industryCatalog/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function listPlatformCatalog() {
  try {
    const res = await fetch(`${MOCK_API_BASE}/platformCatalog`);
    if (!res.ok)
      return [];
    return res.json();
  } catch (e) {
    return [];
  }
}
async function addPlatformCatalog(data) {
  const res = await fetch(`${MOCK_API_BASE}/platformCatalog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function updatePlatformCatalog(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/platformCatalog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function deletePlatformCatalog(id) {
  const res = await fetch(`${MOCK_API_BASE}/platformCatalog/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function listTeamMembers() {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers`);
  return res.json();
}
async function getSystemPreferences() {
  const res = await fetch(`${MOCK_API_BASE}/systemPreferences`);
  return res.json();
}
async function updateSystemPreferences(data) {
  const res = await fetch(`${MOCK_API_BASE}/systemPreferences`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function addTeamMember(data) {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function updateTeamMember(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function deleteTeamMember(id) {
  const res = await fetch(`${MOCK_API_BASE}/teamMembers/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
async function getInsertionOrder(id) {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`);
  if (res.status === 404)
    return null;
  return res.json();
}
async function deleteKol(id) {
  const res = await fetch(`${MOCK_API_BASE}/kols/${id}`, { method: "DELETE" });
  return res.ok;
}
async function updateKol(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/kols/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok)
    throw new Error("Update failed");
  return res.json();
}
async function updateInsertionOrder(id, data) {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok)
    throw new Error("Update failed");
  return res.json();
}
async function addIOReview(orderId, kolId, review) {
  const io = await getInsertionOrder(orderId);
  if (!io)
    throw new Error("Order not found");
  const collabs = io.collaborations ?? [];
  const collabIndex = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (collabIndex === -1)
    throw new Error("Collaboration not found");
  const newReview = {
    ...review,
    id: `rv_${Date.now()}`,
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  const updatedCollabs = [...collabs];
  updatedCollabs[collabIndex] = {
    ...updatedCollabs[collabIndex],
    reviews: [...updatedCollabs[collabIndex].reviews ?? [], newReview]
  };
  return updateInsertionOrder(orderId, { collaborations: updatedCollabs });
}
async function updateIOPerformance(orderId, kolId, performance) {
  const io = await getInsertionOrder(orderId);
  if (!io)
    throw new Error("Order not found");
  const collabs = io.collaborations ?? [];
  const collabIndex = collabs.findIndex((c) => c.kolId === kolId || c.id === kolId);
  if (collabIndex === -1)
    throw new Error("Collaboration not found");
  const newItem = {
    ...performance,
    id: `perf_${Date.now()}`
  };
  const updatedCollabs = [...collabs];
  updatedCollabs[collabIndex] = {
    ...updatedCollabs[collabIndex],
    performanceItems: [...updatedCollabs[collabIndex].performanceItems ?? [], newItem]
  };
  return updateInsertionOrder(orderId, { collaborations: updatedCollabs });
}
async function deleteInsertionOrder(id) {
  const res = await fetch(`${MOCK_API_BASE}/insertionOrders/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}

export {
  MOCK_API_BASE,
  listKols,
  getKol,
  listProposals,
  updateProposal,
  deleteProposal,
  getProposal,
  listProposalKols,
  addProposalKol,
  updateProposalKolStatus,
  deleteProposalKol,
  listInsertionOrders,
  listTagCatalog,
  addTagCatalog,
  updateTagCatalog,
  deleteTagCatalog,
  listBrandCatalog,
  addBrandCatalog,
  updateBrandCatalog,
  deleteBrandCatalog,
  listIndustryCatalog,
  addIndustryCatalog,
  updateIndustryCatalog,
  deleteIndustryCatalog,
  listPlatformCatalog,
  addPlatformCatalog,
  updatePlatformCatalog,
  deletePlatformCatalog,
  listTeamMembers,
  getSystemPreferences,
  updateSystemPreferences,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getInsertionOrder,
  deleteKol,
  updateKol,
  updateInsertionOrder,
  addIOReview,
  updateIOPerformance,
  deleteInsertionOrder
};
//# sourceMappingURL=/build/_shared/chunk-HZBBB3MW.js.map
