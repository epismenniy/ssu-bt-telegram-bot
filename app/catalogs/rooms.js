/**
 * Created by epismenniy on 01.08.2017.
 */
const rooms = {

	"locations" : {

		"АК" : [
			"АК-ц4",
			"АК-ц5"
		],

		"АН" : [
			"АН-113/1",
			"АН-113/2",
			"АН-114/1",
			"АН-114/2",
			"АН-115/1",
			"АН-115/2",
			"АН-116",
			"АН-119",
			"АН-120-1",
			"АН-120-2",
			"АН-122",
			"АН-128-1",
			"АН-128-2",
			"АН-128-3",
			"АН-131(ЛА2)",
			"АН-133(ЛА1)"
		],

		"БІЦ": [
			"БІЦ-307"
		],

		"Г": [
			"Г-100",
			"Г-1008",
			"Г-1013",
			"Г-1103",
			"Г-1104",
			"Г-1105",
			"Г-1109",
			"Г-1201",
			"Г-1203",
			"Г-1207",
			"Г-1208",
			"Г-1209",
			"Г-1212",
			"Г-1213",
			"Г-1214",
			"Г-1215",
			"Г-1302",
			"Г-1305",
			"Г-1309",
			"Г-1310",
			"Г-1311",
			"Г-1402",
			"Г-1405",
			"Г-1410",
			"Г-1411",
			"Г-200",
			"Г-602",
			"Г-609",
			"Г-702",
			"Г-703",
			"Г-706",
			"Г-801",
			"Г-807",
			"Г-808",
			"Г-811",
			"Г-906",
			"Г-909",
			"Г-910"
		],

		"ЕТ": [
			"ЕТ-105",
			"ЕТ-112",
			"ЕТ-114",
			"ЕТ-121",
			"ЕТ-122",
			"ЕТ-124",
			"ЕТ-126",
			"ЕТ-131",
			"ЕТ-137",
			"ЕТ-203",
			"ЕТ-204",
			"ЕТ-206",
			"ЕТ-207",
			"ЕТ-208",
			"ЕТ-211",
			"ЕТ-216",
			"ЕТ-217",
			"ЕТ-218",
			"ЕТ-222",
			"ЕТ-223",
			"ЕТ-226",
			"ЕТ-228",
			"ЕТ-230",
			"ЕТ-236",
			"ЕТ-242",
			"ЕТ-302б-1",
			"ЕТ-302б-2",
			"ЕТ-302б-3",
			"ЕТ-302б-4",
			"ЕТ-304",
			"ЕТ-310",
			"ЕТ-312",
			"ЕТ-313",
			"ЕТ-314",
			"ЕТ-315",
			"ЕТ-317",
			"ЕТ-400",
			"ЕТ-405",
			"ЕТ-410",
			"ЕТ-411",
			"ЕТ-413",
			"ЕТ-416",
			"ЕТ-417",
			"ЕТ-418",
			"ЕТ-419",
			"ЕТ-502",
			"ЕТ-503",
			"ЕТ-99"
		],

		"К1": [
			"К1-102",
			"К1-103",
			"К1-105",
			"К1-110",
			"К1-113",
			"К1-114",
			"К1-115",
			"К1-202",
			"К1-204",
			"К1-208",
			"К1-209",
			"К1-212",
			"К1-213",
			"К1-214"
		],

		"К2": [
			"К2-104",
			"К2-107",
			"К2-121",
			"К2-123",
			"К2-134",
			"К2-313"
		],

		"КУКл": [
			"КУКл-315",
			"КУКл-410",
			"КУКл-415",
			"КУКл-416",
			"КУКл-501",
			"КУКл-506"
		],

		"ЛА": [
			"ЛА-104",
			"ЛА-105",
			"ЛА-107",
			"ЛА-112",
			"ЛА-120",
			"ЛА-121",
			"ЛА-204",
			"ЛА-205",
			"ЛА-207-а",
			"ЛА-207-б",
			"ЛА-208а",
			"ЛА-213",
			"ЛА-215"
		],

		"ЛБ": [
			"ЛБ-107а",
			"ЛБ-111",
			"ЛБ-114",
			"ЛБ-205"
		],

		"М": [
			"М-103",
			"М-108",
			"М-110",
			"М-203",
			"М-205",
			"М-206",
			"М-209",
			"М-304",
			"М-305",
			"М-306",
			"М-308",
			"М-310",
			"М-409",
			"М-410",
			"М-412",
			"М-414"
		],

		"Н": [
			"Н-106",
			"Н-110",
			"Н-111",
			"Н-112",
			"Н-119",
			"Н-121",
			"Н-209",
			"Н-210",
			"Н-211",
			"Н-212",
			"Н-214",
			"Н-216",
			"Н-220",
			"Н-302",
			"Н-303",
			"Н-308",
			"Н-309",
			"Н-313",
			"Н-314",
			"Н-317",
			"Н-319",
			"Н-320"
		],

		"Общ4": [
			"Общ4-1",
			"Общ4-чит.зал"
		],

		"Общ5": [
			"Общ5-чит.зал"
		],


		"С": [
			"С-116",
			"С-117",
			"С-127",
			"С-200",
			"С-203",
			"С-204",
			"С-208",
			"С-209",
			"С-214",
			"С-215",
			"С-218",
			"С-219",
			"С-302",
			"С-304",
			"С-305"
		],


		"ССМ": [
			"ССМ-302/2",
			"ССМ-316",
			"ССМ-402",
			"ССМ-415",
			"ССМ_акт.зал"
		],

		"Т": [
			"Т-107",
			"Т-108",
			"Т-109-1",
			"Т-112",
			"Т-202",
			"Т-203",
			"Т-204",
			"Т-211"
		],

		"ТЗ": [
			"ТЗ-102а",
			"ТЗ-104",
			"ТЗ-205",
			"ТЗ-206-б",
			"ТЗ-210",
			"ТЗ-211",
			"ТЗ-216",
			"ТЗ-218",
			"ТЗ-219",
			"ТЗ-220",
			"ТЗ-305",
			"ТЗ-306",
			"ТЗ-307",
			"ТЗ-308",
			"ТЗ-309",
			"ТЗ-310",
			"ТЗ-312",
			"ТЗ-315",
			"ТЗ-404",
			"ТЗ-405",
			"ТЗ-406",
			"ТЗ-407",
			"ТЗ-408",
			"ТЗ-411",
			"ТЗ-415"
		],


		"УРМ": [
			"УРМ-1",
			"УРМ-3"
		],


		"Ц": [
			"Ц-105",
			"Ц-116",
			"Ц-133",
			"Ц-134",
			"Ц-201",
			"Ц-204",
			"Ц-207",
			"Ц-208",
			"Ц-209",
			"Ц-215",
			"Ц-216",
			"Ц-217",
			"Ц-218",
			"Ц-219",
			"Ц-220",
			"Ц-221",
			"Ц-222",
			"Ц-224",
			"Ц-225",
			"Ц-226",
			"Ц-236",
			"Ц-237",
			"Ц-238",
			"Ц-241",
			"Ц-301",
			"Ц-302",
			"Ц-308",
			"Ц-309",
			"Ц-315а",
			"Ц-321",
			"Ц-325а",
			"Ц-326",
			"Ц-332",
			"Ц-338",
			"Ц-341",
			"Ц-342"
		]

	}
}

module.exports = rooms;