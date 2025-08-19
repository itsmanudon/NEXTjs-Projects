"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import type { RefObject } from "react";
import L from "leaflet";
import { io, Socket } from "socket.io-client";
import "leaflet/dist/leaflet.css";

type LatLng = {
\tlat: number;
\tlng: number;
};

function normalizePayload(payload: unknown): LatLng | null {
\tif (!payload || typeof payload !== "object") return null;
\tconst maybe = payload as Record<string, unknown>;
\tconst lat = (maybe.lat as number) ?? (maybe.latitude as number);
\tconst lng = (maybe.lng as number) ?? (maybe.longitude as number);
\tif (typeof lat === "number" && typeof lng === "number") {
\t\treturn { lat, lng };
\t}
\treturn null;
}

export default function LiveMap(): JSX.Element {
\tconst mapContainerRef: RefObject<HTMLDivElement> = useRef(null);
\tconst mapRef = useRef<L.Map | null>(null);
\tconst markerRef = useRef<L.Marker | null>(null);
\tconst [position, setPosition] = useState<LatLng | null>(null);
\tconst [connectionStatus, setConnectionStatus] = useState<
\t\t"connecting" | "connected" | "disconnected" | "idle"
\t>("idle");

\tuseEffect(() => {
\t\t// Configure default Leaflet marker icons via CDN to avoid bundling issues
\t\t// when importing image assets in Next.js.
\t\t// eslint-disable-next-line @typescript-eslint/no-explicit-any
\t\t(L.Icon.Default as any).mergeOptions({
\t\t\ticonRetinaUrl:
\t\t\t\t"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
\t\t\ticonUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
\t\t\tshadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
\t\t});

\t\tif (mapRef.current || !mapContainerRef.current) return;

\t\tconst defaultCenter: LatLng = { lat: 20, lng: 0 };
\t\tconst map = L.map(mapContainerRef.current).setView(
\t\t\t[position?.lat ?? defaultCenter.lat, position?.lng ?? defaultCenter.lng],
\t\t\tposition ? 12 : 2
\t\t);
\t\tL.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
\t\t\tattribution: "&copy; OpenStreetMap contributors",
\t\t}).addTo(map);
\t\tmapRef.current = map;

\t\t// Create an initial marker if a position exists
\t\tif (position) {
\t\t\tmarkerRef.current = L.marker([position.lat, position.lng]).addTo(map);
\t\t}

\t\treturn () => {
\t\t\tmap.remove();
\t\t\tmapRef.current = null;
\t\t\tmarkerRef.current = null;
\t\t};
\t}, [position]);

\tuseEffect(() => {
\t\tlet socket: Socket | null = null;
\t\tconst socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

\t\ttry {
\t\t\tsetConnectionStatus(socketUrl ? "connecting" : "idle");
\t\t\t// If a socket URL is provided, connect; otherwise, stay idle.
\t\t\tif (socketUrl) {
\t\t\t\tsocket = io(socketUrl, {
\t\t\t\t\ttransports: ["websocket"],
\t\t\t\t\twithCredentials: true,
\t\t\t\t});

\t\t\t\tsocket.on("connect", () => setConnectionStatus("connected"));
\t\t\t\tsocket.on("disconnect", () => setConnectionStatus("disconnected"));

\t\t\t\t// Try common event names
\t\t\t\tconst handleUpdate = (data: unknown) => {
\t\t\t\t\tconst next = normalizePayload(data);
\t\t\t\t\tif (!next) return;
\t\t\t\t\tsetPosition(next);
\t\t\t\t\tif (mapRef.current) {
\t\t\t\t\t\tif (!markerRef.current) {
\t\t\t\t\t\t\tmarkerRef.current = L.marker([next.lat, next.lng]).addTo(
\t\t\t\t\t\t\t\tmapRef.current
\t\t\t\t\t\t\t);
\t\t\t\t\t\t} else {
\t\t\t\t\t\t\tmarkerRef.current.setLatLng([next.lat, next.lng]);
\t\t\t\t\t\t}
\t\t\t\t\t\tmapRef.current.setView([next.lat, next.lng], 15);
\t\t\t\t\t}
\t\t\t\t};

\t\t\t\tsocket.on("location", handleUpdate);
\t\t\t\tsocket.on("locationUpdate", handleUpdate);
\t\t\t\tsocket.on("position", handleUpdate);
\t\t\t}
\t\t} catch {
\t\t\tsetConnectionStatus("disconnected");
\t\t}

\t\treturn () => {
\t\t\tif (socket) {
\t\t\t\tsocket.disconnect();
\t\t\t}
\t\t};
\t}, []);

\treturn (
\t\t<div className="w-full h-full flex flex-col gap-2">
\t\t\t<div className="w-full h-[70vh] rounded-md overflow-hidden border border-black/10 dark:border-white/15">
\t\t\t\t<div ref={mapContainerRef} className="w-full h-full" />
\t\t\t</div>
\t\t\t<div className="text-sm text-foreground/80 flex items-center gap-3">
\t\t\t\t<span className="font-mono">
\t\t\t\t\tStatus: {connectionStatus}
\t\t\t\t</span>
\t\t\t\t{position ? (
\t\t\t\t\t<span className="font-mono">
\t\t\t\t\t\tLat: {position.lat.toFixed(5)}, Lng: {position.lng.toFixed(5)}
\t\t\t\t\t</span>
\t\t\t\t) : (
\t\t\t\t\t<span className="opacity-80">Waiting for location updates…</span>
\t\t\t\t)}
\t\t\t</div>
\t\t\t{!process.env.NEXT_PUBLIC_SOCKET_URL && (
\t\t\t\t<p className="text-xs opacity-70">
\t\t\t\t\tSet <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">NEXT_PUBLIC_SOCKET_URL</code>
\t\t\t\t\tin your environment to enable live updates via Socket.IO.
\t\t\t\t</p>
\t\t\t)}
\t\t</div>
\t);
}


