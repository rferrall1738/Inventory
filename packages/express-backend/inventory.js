import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        Item:{
            type: String,
            required: true,
            trim: true,
            validate(value){
                if (value.length <2){
                    throw new Error("Invalid item")
                }
            },
        },
        Category:{
            type: String,
            required: true,
            trim: true,
            enum:{
                values:["Backpacks","Bikes","Clothing","Jewelry","Keys/Wallet","Other","Technology"],
                message: '{VALUE} is not a valid category. Valid categories are: Backpacks, Bikes, Clothing, Jewelry, Keys/Wallet, Other,and Technology.'
            }
        },
        Location:{
            type: String,
            required: true,
            trim: true,
            enum:{
                values:["Administration", "Cotchett Education Building", "Business", "Research Development Center",
                "Architecture & Environmental Design", "Christopher Cohan Performing Arts Center",
                "Advanced Technologies Laboratories", "Bioresource and Agricultural Engineering", "Farm Shop",
                "Alan A. Erhart Agriculture", "Agricultural Sciences", "Engineering",
                "Frank E. Pilling Computer Science Building", "Cal Poly Corporation Administration",
                "Beef Unit", "Crop Science", "Dairy Science", "Leprino Foods Dairy Innovation Institute",
                "Dining Complex", "Engineering East", "Engineering West", "English", "Food Processing",
                "Faculty Offices East", "Graphic Arts", "Graphic Arts Modular", "Health Center",
                "Albert B. Smith Alumni and Conference Center", "University Housing",
                "Oppenheimer Family Equine Center", "Clyde P. Fisher Science Hall", "Walter F. Dexter Building",
                "Robert E. Kennedy Library", "University Police", "Mathematics and Science", "Engineering South",
                "Engineering III", "Robert A. Mott Athletics Center", "Recreation Center", "Kinesiology",
                "Alex and Faye Spanos Theater", "H. P. Davidson Music Center", "Crandall Gymnasium & Old Natatorium",
                "Faculty Offices North", "Environmental Horticultural Science", "Mount Bishop Warehouse, Rose Float Lab, Communications Storage",
                "Science", "Science North", "Beef Cattle Evaluation Center", "Swine Unit", "Veterinary Hospital",
                "Welding", "Crandall Gymnasium & Old Natatorium", "Alex G. Spanos Stadium",
                "Julian A. McPhee University Union", "Facilities", "Fleet Services", "Plant Conservatory",
                "Eucalyptus House", "Building 74 Modular Offices", "Environmental Health & Safety",
                "Hillcrest", "Corporation Warehouse", "Technology Park", "Poly Grove Modular Offices",
                "Shasta Hall", "Diablo Hall", "Palomar Hall", "Whitney Hall", "Lassen Hall", "Trinity Hall",
                "Santa Lucia Hall", "Muir Hall", "Sequoia Hall", "Fremont Hall", "Tenaya Hall", "Vista Grande",
                "Sierra Madre Hall", "Yosemite Hall", "Chase Hall", "Jespersen Hall", "Heron Hall",
                "Heron Hall Modular", "Cheda Ranch", "Parker Ranch", "Peterson Ranch", "Student Services",
                "Serrano Ranch", "Chorro Creek Ranch", "Grand Avenue Parking Structure", "Parking Structure",
                "Orfalea Family and ASI Children's Center", "Poultry Science Instructional Center",
                "Animal Nutrition Center", "J & G Lau Family Meat Processing Center", "E. & J. Gallo Winery & Family Building",
                "Lohr Family Winery", "Sports Complex", "Dignity Health Baseball Clubhouse", "Cerro Vista Room Number Map",
                "Cerro Morro", "Cerro Cabrillo", "Cerro Hollister", "Cerro Romauldo", "Cerro Bishop", "Cerro Islay",
                "Cerro San Luis", "Poly Canyon Village Room Number Map", "Aliso", "Buena Vista", "Corralitos",
                "Dover", "Estrella", "Foxen", "Gypsum", "Huasna", "Inyo", "tsɨtkawayu", "elewexe", "tiłhini",
                "tšɨłkukunɨtš", "nipumuʔ", "tsɨtqawɨ", "tsɨtpxatu", "Welcome Center & yakʔitʸutʸu Hall",
                "Warren J. Baker Center for Science and Mathematics", "William and Linda Frost Center for Research and Innovation",
                "Construction Innovations Center", "Simpson Strong-Tie Materials Demonstration Lab",
                "Engineering IV", "Bonderson Engineering Project Center", "Center for Coastal Marine Sciences",
                "Village Drive Parking Structure", "Canyon Circle Parking Structure", "Housing Depot"],
            message: '{VALUE} is not a valid location. Please refer to https://afd.calpoly.edu/facilities/campus-maps/building-floor-plans/'
            }
        },
        Date: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function(date){
                    const datePattern = /^\d{1,2}-\d{1,2}-\d{4}$/;
                    return datePattern.test(date)
                },
                message: props => `${props.date} is not in the proper format. Use 10-31-2024 for example`
            },
        },
    },
    {collection: "Inventory"}
);
const inventory = mongoose.model("Inventory", InventorySchema);

export default inventory