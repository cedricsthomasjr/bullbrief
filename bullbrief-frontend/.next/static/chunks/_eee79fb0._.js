(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/summary/[ticker]/metric/[metric]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MetricDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/bullbrief-frontend/app/components/MetricChart'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/bullbrief-frontend/app/components/LoadingScreen'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MetricDetailPage() {
    _s();
    const { ticker, metric } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [aiSummary, setAiSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const lastGoodData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [summaryLoading, setSummaryLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const bulletPoints = aiSummary?.split("\n").filter((line)=>line.trim().startsWith("-")).map((line)=>line.replace(/^- /, "").trim());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MetricDetailPage.useEffect": ()=>{
            if (!ticker || !metric) return;
            const fetchData = {
                "MetricDetailPage.useEffect.fetchData": async ()=>{
                    setDataLoading(true);
                    try {
                        const endpoint = [
                            "eps",
                            "revenue"
                        ].includes(metric.toLowerCase()) ? `http://localhost:8000/metric/${ticker}/${metric}` // <— use new clean route
                         : `http://localhost:8000/macrotrends/${ticker}`;
                        const res = await fetch(endpoint);
                        const json = await res.json();
                        let extractedData = null;
                        if ([
                            "eps",
                            "revenue"
                        ].includes(metric.toLowerCase())) {
                            extractedData = json.data;
                        } else {
                            const metricKey = Object.keys(json.data).find({
                                "MetricDetailPage.useEffect.fetchData.metricKey": (k)=>k.toLowerCase() === metric.toLowerCase()
                            }["MetricDetailPage.useEffect.fetchData.metricKey"]);
                            extractedData = metricKey && Array.isArray(json.data[metricKey]) ? json.data[metricKey] : null;
                        }
                        if (extractedData) {
                            lastGoodData.current = extractedData;
                            setData(extractedData);
                        } else {
                            setData(lastGoodData.current);
                        }
                    } catch (e) {
                        console.error("Failed to fetch metric data:", e);
                        setData(lastGoodData.current);
                    } finally{
                        setDataLoading(false);
                    }
                }
            }["MetricDetailPage.useEffect.fetchData"];
            fetchData();
        }
    }["MetricDetailPage.useEffect"], [
        ticker,
        metric
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MetricDetailPage.useEffect": ()=>{
            if (!ticker || !metric) return;
            const fetchAISummary = {
                "MetricDetailPage.useEffect.fetchAISummary": async ()=>{
                    setSummaryLoading(true);
                    try {
                        const res = await fetch(`http://localhost:8000/interpret/${ticker}?metric=${metric}`);
                        const json = await res.json();
                        setAiSummary(json.analysis ?? null);
                    } catch (err) {
                        setAiSummary(null);
                    } finally{
                        setSummaryLoading(false);
                    }
                }
            }["MetricDetailPage.useEffect.fetchAISummary"];
            fetchAISummary();
        }
    }["MetricDetailPage.useEffect"], [
        ticker,
        metric
    ]);
    if (dataLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingScreen, {}, void 0, false, {
        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
        lineNumber: 84,
        columnNumber: 27
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-5xl mx-auto px-6 pt-24 pb-12 text-white space-y-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold capitalize tracking-tight",
                children: [
                    metric,
                    " – ",
                    ticker
                ]
            }, void 0, true, {
                fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                lineNumber: 88,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricChart, {
                    data: data,
                    title: metric
                }, void 0, false, {
                    fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                    lineNumber: 94,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                lineNumber: 93,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold text-white tracking-tight",
                        children: "🧠 AI Interpretation"
                    }, void 0, false, {
                        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                        lineNumber: 99,
                        columnNumber: 5
                    }, this),
                    summaryLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 italic animate-pulse",
                        children: "Generating summary..."
                    }, void 0, false, {
                        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                        lineNumber: 102,
                        columnNumber: 7
                    }, this) : bulletPoints && bulletPoints.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                        children: bulletPoints.map((point, idx)=>{
                            const [title, ...rest] = point.split(":");
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-zinc-900 border border-zinc-700 p-5 rounded-xl shadow hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-blue-400 font-semibold mb-1",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 text-sm leading-relaxed",
                                        children: rest.join(":").trim()
                                    }, void 0, false, {
                                        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                        lineNumber: 104,
                        columnNumber: 7
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-500 italic",
                        children: "Could not generate summary."
                    }, void 0, false, {
                        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                        lineNumber: 116,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
                lineNumber: 98,
                columnNumber: 3
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/summary/[ticker]/metric/[metric]/page.tsx",
        lineNumber: 87,
        columnNumber: 1
    }, this);
}
_s(MetricDetailPage, "qDy4dsDgdSk+mi9PCuAtfoDhKik=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = MetricDetailPage;
var _c;
__turbopack_context__.k.register(_c, "MetricDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_eee79fb0._.js.map