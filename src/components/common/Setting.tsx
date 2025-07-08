// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { User, Shield, Palette, LogOut, Trash2, Key, AlertTriangle, CheckCircle } from "lucide-react"
// import ThemeToggle from "@/components/settings/ThemeToggle"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { Logout } from "../auth/Logout"
// import { useRouter } from "next/navigation"
// import { getUser } from "@/lib/getUser";
// import { getUserDetails, updateUserDetails } from "@/lib/api2";

// export default function SettingsPage() {
//   const router = useRouter();
//   // const [notifications, setNotifications] = useState({
//   //   email: true,
//   //   push: false,
//   //   security: true,
//   // })

//   // Profile form state
//  const [profileData, setProfileData] = useState({
//   // fullName: "",
//   username: "",
//   email: "",
// });

// useEffect(() => {
//   const loadUser = async () => {
//     try {
//       const user = await getUser();
//       if (!user?.id) throw new Error("User ID not found");

//       const userDetails = await getUserDetails(user.id);

//       setProfileData({
//         username: userDetails.username || "",
//         email: userDetails.email || "",
//       });
//     } catch (err) {
//       console.error("Failed to load user data:", err);
//     }
//   };
//   loadUser();
// }, []);

//   const [isUpdating, setIsUpdating] = useState(false)
//   const [isLoggingOut, setIsLoggingOut] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [updateSuccess, setUpdateSuccess] = useState(false)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [confirmDeleteText, setConfirmDeleteText] = useState("")

//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//   })

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   }

//   // Validate form fields
//   const validateForm = () => {
//     const newErrors = {
//       username: "",
//       email: "",
//     }
//     if (!profileData.username.trim()) {
//       newErrors.username = "Username is required"
//     } else if (profileData.username.length < 3) {
//       newErrors.username = "Username must be at least 3 characters"
//     }

//     if (!profileData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
//       newErrors.email = "Please enter a valid email address"
//     }

//     setErrors(newErrors)
//     return !Object.values(newErrors).some((error) => error !== "")
//   }
//   const handleUpdateProfile = async () => {
//   if (!validateForm()) return;

//   setIsUpdating(true);
//   setUpdateSuccess(false);

//   try {
//     await updateUserDetails({
//       username: profileData.username,
//       email: profileData.email,
//     });

//     setUpdateSuccess(true);
//     setTimeout(() => setUpdateSuccess(false), 3000);
//   } catch (error) {
//     console.error("Failed to update profile:", error);
//   } finally {
//     setIsUpdating(false);
//   }
// };


//   // Handle logout
//   const handleLogout = async () => {
//     setIsLoggingOut(true)

//     try {
//       await Logout()
//       router.replace("/");
//     } catch (error) {
//       console.error("Logout failed:", error)
//     } finally {
//       setIsLoggingOut(false)
//     }
//   }

//   // Handle account deletion
//   const handleDeleteAccount = async () => {
//     if (confirmDeleteText !== "DELETE") {
//       return
//     }

//     setIsDeleting(true)

//     try {
//       await Logout()
//       router.replace("/");
//       setDeleteDialogOpen(false)
//     } catch (error) {
//       console.error("Failed to delete account:", error)
//     } finally {
//       setIsDeleting(false)
//       setConfirmDeleteText("")
//     }
//   }

//   // Handle input changes
//   const handleInputChange = (field: string, value: string) => {
//     setProfileData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))

//     // Clear error when user starts typing
//     if (errors[field as keyof typeof errors]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }))
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 dark:from-black dark:to-gray-800">
//       <div className="max-w-3xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
//         </motion.div>

//         <div className="space-y-6">
//           {/* Success Alert */}
//           {updateSuccess && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
//               <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
//                 <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
//                 <AlertDescription className="text-green-800 dark:text-green-200">
//                   Profile updated successfully!
//                 </AlertDescription>
//               </Alert>
//             </motion.div>
//           )}

//           {/* Profile Settings */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.3, delay: 0.1 }}
//           >
//             <Card className="hover:shadow-lg transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
//                   <User className="w-5 h-5 text-primary" />
//                   Profile
//                 </CardTitle>
//                 <CardDescription>Update your profile information</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
//                   <div>
//                     <Label htmlFor="username">Username</Label>
//                     <Input
//                       id="username"
//                       value={profileData.username}
//                       onChange={(e) => handleInputChange("username", e.target.value)}
//                       className={`dark:bg-gray-800 dark:border-gray-700 ${errors.username ? "border-red-500" : ""}`}
//                     />
//                     {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={profileData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className={`dark:bg-gray-800 dark:border-gray-700 ${errors.email ? "border-red-500" : ""}`}
//                   />
//                   {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
//                 </div>

//                 <Button className="w-full md:w-auto" onClick={handleUpdateProfile} disabled={isUpdating}>
//                   {isUpdating ? "Saving..." : "Save Changes"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Security */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.3, delay: 0.2 }}
//           >
//             <Card className="hover:shadow-lg transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
//                   <Shield className="w-5 h-5 text-primary" />
//                   Security
//                 </CardTitle>
//                 <CardDescription>Manage your account security</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//                   <div>
//                     <h4 className="font-medium">Change Password</h4>
//                     {/* <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p> */}
//                   </div>
//                   <Link href="/user/changepassword">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
//                     >
//                       <Key className="w-4 h-4 mr-2" />
//                       Change
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Appearance */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.3, delay: 0.4 }}
//           >
//             <Card className="hover:shadow-lg transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
//                   <Palette className="w-5 h-5 text-primary" />
//                   Appearance
//                 </CardTitle>
//                 <CardDescription>Toggle between light and dark theme</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//                   <div>
//                     <h4 className="font-medium">Dark Mode</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
//                   </div>
//                   <ThemeToggle />
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Account Actions */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ duration: 0.3, delay: 0.5 }}
//           >
//             <Card className="hover:shadow-lg transition-shadow duration-300 border-red-100 dark:border-red-900/50">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
//                   <LogOut className="w-5 h-5 text-primary" />
//                   Account
//                 </CardTitle>
//                 <CardDescription>Manage your account</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   {isLoggingOut ? "Signing Out..." : "Sign Out"}
//                 </Button>

//                 <Separator />

//                 <div className="space-y-3">
//                   <div>
//                     <h4 className="font-medium text-red-600 dark:text-red-500">Danger Zone</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Permanently delete your account and all data. This cannot be undone.
//                     </p>
//                   </div>

//                   <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//                     <DialogTrigger asChild>
//                       <Button
//                         variant="destructive"
//                         className="w-full justify-start hover:bg-red-700 dark:hover:bg-red-700"
//                       >
//                         <Trash2 className="w-4 h-4 mr-2" />
//                         Delete Account
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle className="flex items-center gap-2 text-red-600">
//                           <AlertTriangle className="w-5 h-5" />
//                           Delete Account
//                         </DialogTitle>
//                         <DialogDescription className="text-left">
//                           This action cannot be undone. This will permanently delete your account and remove all your
//                           data from our servers.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="space-y-4 py-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="confirm-delete">
//                             Type <span className="font-mono font-bold">DELETE</span> to confirm:
//                           </Label>
//                           <Input
//                             id="confirm-delete"
//                             value={confirmDeleteText}
//                             onChange={(e) => setConfirmDeleteText(e.target.value)}
//                             placeholder="DELETE"
//                             className="font-mono"
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter className="gap-2">
//                         <Button
//                           variant="outline"
//                           onClick={() => {
//                             setDeleteDialogOpen(false)
//                             setConfirmDeleteText("")
//                           }}
//                           disabled={isDeleting}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           onClick={handleDeleteAccount}
//                           disabled={confirmDeleteText !== "DELETE" || isDeleting}
//                         >
//                           {isDeleting ? "Deleting..." : "Delete Account"}
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Shield, Palette, LogOut, Trash2, Key, AlertTriangle, Settings } from "lucide-react"
import ThemeToggle from "@/components/settings/ThemeToggle"
import { motion } from "framer-motion"
import Link from "next/link"
import { Logout } from "../auth/Logout"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/getUser"
import { getUserDetails, updateUserDetails } from "@/lib/api2"
import { toast } from "sonner"

export default function SettingsPage() {
  const router = useRouter()

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser()
        if (!user?.id) throw new Error("User ID not found")

        const userDetails = await getUserDetails(user.id)
        setProfileData({
          username: userDetails.username || "",
          email: userDetails.email || "",
        })
      } catch (err) {
        console.error("Failed to load user data:", err)
        toast.error("Failed to load user data")
      }
    }
    loadUser()
  }, [])

  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [confirmDeleteText, setConfirmDeleteText] = useState("")
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
    }

    if (!profileData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (profileData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleUpdateProfile = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving")
      return
    }

    setIsUpdating(true)

    try {
      await updateUserDetails({
        username: profileData.username,
        email: profileData.email,
      })

      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await Logout()
      toast.success("Signed out successfully")
      router.replace("/")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Failed to sign out")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (confirmDeleteText !== "DELETE") {
      toast.error("Please type DELETE to confirm")
      return
    }

    setIsDeleting(true)

    try {
      await Logout()
      toast.success("Account deleted successfully")
      router.replace("/")
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Failed to delete account:", error)
      toast.error("Failed to delete account")
    } finally {
      setIsDeleting(false)
      setConfirmDeleteText("")
    }
  }

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="w-5 h-5 text-primary" />
                  Profile
                </CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className={errors.username ? "border-destructive" : ""}
                    />
                    {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <Button onClick={handleUpdateProfile} disabled={isUpdating} className="w-full md:w-auto">
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="w-5 h-5 text-primary" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Link href="/user/changepassword">
                    <Button variant="outline" size="sm">
                      <Key className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Preferences */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Settings className="w-5 h-5 text-primary" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your experience for better recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <h4 className="font-medium">Update Your Preferences</h4>
                    <p className="text-sm text-muted-foreground">
                      Personalize your experience and get better recommendations by updating your preferences
                    </p>
                  </div>
                  <Link href="/user/preference">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Update
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Appearance */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Palette className="w-5 h-5 text-primary" />
                  Appearance
                </CardTitle>
                <CardDescription>Toggle between light and dark theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <LogOut className="w-5 h-5 text-primary" />
                  Account
                </CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoggingOut ? "Signing Out..." : "Sign Out"}
                </Button>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-destructive">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data. This cannot be undone.
                    </p>
                  </div>

                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                          <AlertTriangle className="w-5 h-5" />
                          Delete Account
                        </DialogTitle>
                        <DialogDescription className="text-left">
                          This action cannot be undone. This will permanently delete your account and remove all your
                          data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="confirm-delete">
                            Type <span className="font-mono font-bold">DELETE</span> to confirm:
                          </Label>
                          <Input
                            id="confirm-delete"
                            value={confirmDeleteText}
                            onChange={(e) => setConfirmDeleteText(e.target.value)}
                            placeholder="DELETE"
                            className="font-mono"
                          />
                        </div>
                      </div>
                      <DialogFooter className="gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setDeleteDialogOpen(false)
                            setConfirmDeleteText("")
                          }}
                          disabled={isDeleting}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={confirmDeleteText !== "DELETE" || isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

