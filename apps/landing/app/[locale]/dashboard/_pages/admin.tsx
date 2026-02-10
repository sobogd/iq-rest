"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Building2, FolderOpen, Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "../_ui/page-loader";

interface Restaurant {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  accentColor: string;
  createdAt: string;
  url: string | null;
}

interface Company {
  id: string;
  name: string;
  createdAt: string;
  plan: string;
  subscriptionStatus: string;
  categoriesCount: number;
  itemsCount: number;
  users: string[];
  restaurants: Restaurant[];
}

export function AdminPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch("/api/admin/companies");
        if (!res.ok) {
          if (res.status === 403) {
            setError("Access denied");
          } else {
            setError("Failed to load data");
          }
          return;
        }
        const data = await res.json();
        setCompanies(data);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  const totalCategories = companies.reduce((sum, c) => sum + c.categoriesCount, 0);
  const totalItems = companies.reduce((sum, c) => sum + c.itemsCount, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{companies.length}</p>
                  <p className="text-sm text-muted-foreground">Companies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {companies.reduce((sum, c) => sum + c.users.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalCategories}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalItems}</p>
                  <p className="text-sm text-muted-foreground">Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Registered Companies</h2>
          <div className="space-y-4">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {company.name}
                        <Badge variant={company.plan === "FREE" ? "secondary" : "default"}>
                          {company.plan}
                        </Badge>
                        {company.subscriptionStatus === "ACTIVE" && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Active
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Registered: {new Date(company.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{company.categoriesCount} categories</p>
                      <p>{company.itemsCount} items</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {/* Users */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Users:</p>
                    <div className="flex flex-wrap gap-1">
                      {company.users.map((email) => (
                        <Badge key={email} variant="outline" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Restaurants */}
                  {company.restaurants.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Restaurants:</p>
                      <div className="space-y-2">
                        {company.restaurants.map((restaurant) => (
                          <div
                            key={restaurant.id}
                            className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                          >
                            <div
                              className="w-4 h-4 rounded-full shrink-0"
                              style={{ backgroundColor: restaurant.accentColor }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{restaurant.title}</p>
                              {restaurant.description && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {restaurant.description}
                                </p>
                              )}
                            </div>
                            {restaurant.url && (
                              <a
                                href={restaurant.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
                              >
                                {restaurant.slug}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
