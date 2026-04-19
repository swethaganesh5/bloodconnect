from geopy.distance import geodesic

COMPATIBLE_GROUPS = {
    "A+":  ["A+", "AB+"],
    "A-":  ["A+", "A-", "AB+", "AB-"],
    "B+":  ["B+", "AB+"],
    "B-":  ["B+", "B-", "AB+", "AB-"],
    "O+":  ["A+", "B+", "O+", "AB+"],
    "O-":  ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
}

def find_matching_donors(donors, request_blood_group, hospital_lat, hospital_lon, top_n=5):
    compatible = COMPATIBLE_GROUPS.get(request_blood_group, [])
    matched = []

    for donor in donors:
        if donor["blood_group"] not in compatible:
            continue
        if not donor["available"]:
            continue
        if not donor["latitude"] or not donor["longitude"]:
            continue

        distance = geodesic(
            (hospital_lat, hospital_lon),
            (donor["latitude"], donor["longitude"])
        ).km

        matched.append({**donor, "distance_km": round(distance, 2)})

    matched.sort(key=lambda x: x["distance_km"])
    return matched[:top_n]